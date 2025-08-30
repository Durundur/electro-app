using Application.Exceptions;
using Application.Services.Models;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;

namespace Application.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<(List<Product> Products, int TotalCount)> GetSearchProductsAsync(Dictionary<string, string[]> filters, int? groupId, int? categoryId, int? subCategoryId, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery()
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0);

            if (groupId.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.Group != null && p.Group.Id == groupId.Value);
            }

            if (categoryId.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.Category != null && p.Category.Id == categoryId.Value);
            }

            if (subCategoryId.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.SubCategory != null && p.SubCategory.Id == subCategoryId.Value);
            }

            if (filters.Any())
            {
                foreach (var filter in filters)
                {

                    if (filter.Key == "from" && decimal.TryParse(filter.Value.FirstOrDefault(), out var priceFrom))
                    {
                        productsQuery = productsQuery.Where(p => p.Price.Amount >= priceFrom);
                        continue;
                    }

                    if (filter.Key == "to" && decimal.TryParse(filter.Value.FirstOrDefault(), out var priceTo))
                    {
                        productsQuery = productsQuery.Where(p => p.Price.Amount <= priceTo);
                        continue;
                    }

                    if (filter.Key == "search" && !string.IsNullOrEmpty(filter.Value.FirstOrDefault()))
                    {
                        var query = filter.Value.FirstOrDefault().ToLower();

                        productsQuery = productsQuery.Where(p =>
                            p.Name.ToLower().Contains(query) ||
                            p.Description != null && p.Description.ToLower().Contains(query) ||
                            p.Attributes.Any(a => a.Value.ToLower().Contains(query))
                        );
                        continue;
                    }

                    if (filter.Key == "sort")
                    {
                        switch (filter.Value.FirstOrDefault())
                        {
                            case "accuracy":
                                break;
                            case "price-asc":
                                productsQuery = productsQuery.OrderBy(p => p.Price.Amount);
                                break;
                            case "price-desc":
                                productsQuery = productsQuery.OrderByDescending(p => p.Price.Amount);
                                break;
                            default:
                                break;
                        }
                        continue;
                    }

                    if (Guid.TryParse(filter.Key, out Guid attributeDefId))
                    {
                        var attributeValues = filter.Value;
                        productsQuery = productsQuery.Where(p => p.Attributes.Any(a => a.AttributeDefinition.Id == attributeDefId && attributeValues.Contains(a.Value)));
                        continue;
                    }
                }
            }

            var totalProducts = await productsQuery.CountAsync(cancellationToken);

            var products = await productsQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            foreach (var product in products)
            {
                var primaryAttributes = product.Attributes.Where(a => a.IsPrimary).ToList();

                var field = typeof(Product).GetField("_attributes", BindingFlags.NonPublic | BindingFlags.Instance);
                if (field != null)
                {
                    field.SetValue(product, primaryAttributes);
                }
            }

            return (products, totalProducts);
        }

        public async Task<List<Product>> GetFeaturedProductsAsync(int limit, CancellationToken cancellationToken = default)
        {
            var products = await _unitOfWork.ProductRepository.GetProductsQuery()
                .AsNoTracking()
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .OrderByDescending(p => p.Opinions.Any() ? p.Opinions.Average(o => o.Rating) : 0)
                .ThenByDescending(p => p.Opinions.Count())
                .Take(limit)
                .ToListAsync(cancellationToken);

            return products;
        }

        public async Task<List<Product>> GetBestsellerProductsAsync(int limit, CancellationToken cancellationToken = default)
        {
            var products = await _unitOfWork.OrderRepository.GetOrdersQuery()
                .SelectMany(o => o.Products)
                .GroupBy(p => p.Product)
                .Select(g => new
                {
                    Product = g.Key,
                    SoldCount = g.Count()
                })
                .Where(x => x.Product.Status == ProductStatus.Active && x.Product.StockQuantity > 0)
                .OrderByDescending(x => x.SoldCount)
                .Take(limit)
                .Select(x => x.Product)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return products;
        }

        public async Task<List<Product>> GetSimilarProductsAsync(Guid productId, int limit, CancellationToken cancellationToken = default)
        {
            var sourceProduct = await _unitOfWork.ProductRepository.GetByIdAsync(productId, cancellationToken);
            if (sourceProduct == null)
            {
                throw new NotFoundException($"Product with ID {productId} not found");
            }

            var similarProductsQuery = await _unitOfWork.ProductRepository.GetProductsQuery()
                .AsNoTracking()
                .Where(p => p.Id != productId)
                .Where(p => sourceProduct.Group != null && p.Group != null && p.Group.Id == sourceProduct.Group.Id)
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .ToListAsync(cancellationToken);

            var productsWithScores = similarProductsQuery
                .Select(product => new
                {
                    Product = product,
                    SimilarityScore = CalculateSimilarityScore(sourceProduct, product)
                })
                .Where(x => x.SimilarityScore > 0)
                .OrderByDescending(x => x.SimilarityScore)
                .Take(limit)
                .Select(x => x.Product)
                .ToList();

            return productsWithScores;
        }

        private static decimal CalculateSimilarityScore(Product sourceProduct, Product candidateProduct)
        {
            decimal score = 0;

            if (sourceProduct.Group != null && candidateProduct.Group != null && candidateProduct.Group.Id == sourceProduct.Group.Id)
                score += 1m;
            if (sourceProduct.Category != null && candidateProduct.Category != null && candidateProduct.Category.Id == sourceProduct.Category.Id)
                score += 1m;
            if (sourceProduct.SubCategory != null && candidateProduct.SubCategory != null && candidateProduct.SubCategory.Id == sourceProduct.SubCategory.Id)
                score += 1m;

            var primarySourceAttributes = sourceProduct.Attributes.Where(a => a.IsPrimary).ToList();
            var primaryCandidateAttributes = candidateProduct.Attributes.Where(a => a.IsPrimary).ToList();

            var commonPrimaryAttributesCount = primaryCandidateAttributes.Count(a =>
                primarySourceAttributes.Any(sa =>
                    sa.AttributeDefinition.Id == a.AttributeDefinition.Id &&
                    sa.Value == a.Value
                ));

            score += commonPrimaryAttributesCount * 0.5m;

            var secondarySourceAttributes = sourceProduct.Attributes.Where(a => !a.IsPrimary).ToList();
            var secondaryCandidateAttributes = candidateProduct.Attributes.Where(a => !a.IsPrimary).ToList();

            var commonSecondaryAttributesCount = secondaryCandidateAttributes.Count(a =>
                secondarySourceAttributes.Any(sa =>
                    sa.AttributeDefinition.Id == a.AttributeDefinition.Id &&
                    sa.Value == a.Value
                ));

            score += commonSecondaryAttributesCount * 0.2m;

            var priceDifference = Math.Abs(1 - candidateProduct.Price.Amount / sourceProduct.Price.Amount);
            var priceScore = Math.Max(0, 1 - priceDifference);

            score += priceScore;

            return score;
        }

        public async Task<List<SearchFilterModel>> GetSearchFiltersAsync(int? groupId, int? categoryId, int? subCategoryId, CancellationToken cancellationToken = default)
        {
            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery()
                .AsNoTracking()
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0);

            if (groupId.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.Group != null && p.Group.Id == groupId);
            }
            if (categoryId.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.Category != null && p.Category.Id == categoryId);
            }
            if (subCategoryId.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.SubCategory != null && p.SubCategory.Id == subCategoryId);
            }

            Expression<Func<AttributeValue, bool>> hierarchyCondition = null;
            if (subCategoryId.HasValue)
            {
                hierarchyCondition = ad =>
                    EF.Property<int?>(ad.AttributeDefinition, "SubCategoryId") == subCategoryId.Value ||
                    EF.Property<int?>(ad.AttributeDefinition, "CategoryId") == categoryId.Value ||
                    EF.Property<int?>(ad.AttributeDefinition, "GroupId") == groupId.Value;
            }
            else if (categoryId.HasValue)
            {
                hierarchyCondition = ad =>
                    EF.Property<int?>(ad.AttributeDefinition, "CategoryId") == categoryId.Value ||
                    EF.Property<int?>(ad.AttributeDefinition, "GroupId") == groupId.Value;
            }
            else if (groupId.HasValue)
            {
                hierarchyCondition = ad =>
                    EF.Property<int?>(ad.AttributeDefinition, "GroupId") == groupId.Value;
            }

            var attrQuery = productsQuery
                .SelectMany(p => p.Attributes)
                .Where(attr => attr.AttributeDefinition.IsFilterable);

            if (hierarchyCondition is not null)
            {
                attrQuery = attrQuery.Where(hierarchyCondition);
            }
                
            var productsAttributes = await attrQuery
                .OrderBy(ad => ad.AttributeDefinition.Name)
                .GroupBy(attr => attr.AttributeDefinition.Id)
                .ToListAsync(cancellationToken);

            var filters = productsAttributes.Select(attribute => new SearchFilterModel
            {
                AttributeDefinitionId = attribute.Key,
                Name = attribute.First().AttributeDefinition.Name,
                Type = attribute.First().AttributeDefinition.Type,
                Values = attribute.Select(attr => attr.Value.Trim()).Distinct().ToList()
            }).ToList();

            return filters;
        }

        public async Task<Product> GetPromotionHighlightAsync(CancellationToken cancellationToken = default)
        {
            var now = DateTime.UtcNow;

            var product = await _unitOfWork.ProductRepository.GetProductsQuery()
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .Where(p => p.Promotion != null && p.Promotion.IsEnabled && DateTime.UtcNow >= p.Promotion.StartDate && DateTime.UtcNow <= p.Promotion.EndDate)
                .OrderByDescending(p => (p.Price.Amount - p.Promotion.PromotionalPrice.Amount) / p.Price.Amount)
                .FirstOrDefaultAsync(cancellationToken);

            return product;
        }

        public async Task<(List<Product> Products, int TotalCount)> GetProductCatalogAsync(int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery().OrderBy(p => p.Name);

            var totalProducts = await productsQuery.CountAsync(cancellationToken);

            var products = await productsQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return (products, totalProducts);
        }

        public async Task<Product> CreateOrUpdateProductAsync(ProductModel model, CancellationToken cancellationToken = default)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync(cancellationToken: cancellationToken);

                Product product;

                if (model.Id.HasValue)
                {
                    product = await _unitOfWork.ProductRepository.GetByIdWithLockAsync(model.Id.Value);

                    if (product == null)
                    {
                        throw new BadRequestException($"Product with Id {model.Id} was not found");
                    }

                    var price = new Domain.ValueObjects.Money(model.Amount, model.Currency);
                    product.Update(model.Name, model.Description, price, model.Status, product.StockQuantity + model.StockQuantityDelta);
                }
                else
                {
                    var price = new Domain.ValueObjects.Money(model.Amount, model.Currency);
                    product = Product.Create(model.Name, model.Description, price, model.StockQuantityDelta);
                    await _unitOfWork.ProductRepository.AddProductAsync(product, cancellationToken);
                }

                product.UpdatePhotos(model.Photos);
                await UpdateProductHierarchy(product, model, cancellationToken);
                await UpdateProductPromotion(product, model.Promotion, cancellationToken);
                UpdateProductAttributes(product, model.Attributes, cancellationToken);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync(cancellationToken);

                var resultProduct = await _unitOfWork.ProductRepository.GetByIdAsync(product.Id, cancellationToken);

                return resultProduct;
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync(cancellationToken);
                throw new BadRequestException($"Failed to create or update product", ex);
            }
        }

        private async Task UpdateProductHierarchy(Product product, ProductModel model, CancellationToken cancellationToken)
        {
            if (model.SubCategoryId.HasValue)
            {
                var subCategory = await _unitOfWork.ProductHierarchyRepository.GetSubCategoryByIdAsync(model.SubCategoryId.Value, cancellationToken);

                if (subCategory == null)
                {
                    throw new BadRequestException($"SubCategory with ID {model.SubCategoryId.Value} not found");
                }

                product.AssignToSubCategory(subCategory);
            }
            else
            {
                product.UnassignFromSubCategory();
            }

            if (model.CategoryId.HasValue)
            {
                var category = await _unitOfWork.ProductHierarchyRepository.GetCategoryByIdAsync(model.CategoryId.Value, cancellationToken);

                if (category == null)
                {
                    throw new BadRequestException($"Category with ID {model.CategoryId.Value} not found");
                }

                product.AssignToCategory(category);
            }
            else
            {
                product.UnassignFromCategory();
            }

            if (model.GroupId.HasValue)
            {
                var group = await _unitOfWork.ProductHierarchyRepository.GetGroupByIdAsync(model.GroupId.Value, cancellationToken);

                if (group == null)
                {
                    throw new BadRequestException($"Group with ID {model.GroupId.Value} not found");
                }

                product.AssignToGroup(group);
            }
            else
            {
                product.UnassignFromGroup();
            }
        }

        private async Task UpdateProductPromotion(Product product, ProductPromotionModel? promotion, CancellationToken cancellationToken)
        {
            if (promotion == null)
            {
                if (product.Promotion != null)
                {
                    product.RemovePromotion();
                }
                return;
            }

            var promotionalPrice = new Domain.ValueObjects.Money(promotion.PromotionAmount, promotion.PromotionCurrency);

            if (product.Promotion == null)
            {
                product.CreatePromotion(promotionalPrice, promotion.StartDate, promotion.EndDate, promotion.IsActive);
                await _unitOfWork.ProductPromotionRepository.AddProductPromotionAsync(product.Promotion, cancellationToken);
            }
            else
            {
                product.UpdatePromotion(promotionalPrice, promotion.StartDate, promotion.EndDate, promotion.IsActive);
            }
        }

        private void UpdateProductAttributes(Product product, IList<ProductAttributeModel>? attributes, CancellationToken cancellationToken)
        {
            //nie usuwa sie z bazy kiedy dajemy value ""
            var attributeValues = attributes
                .Select(att =>
                {
                    var attributeVal = product.Attributes.FirstOrDefault(a => a.AttributeDefinition.Id == att.Id);
                    return attributeVal == null ? null : AttributeValue.Create(attributeVal.AttributeDefinition, att.Value, att.IsPrimary);
                })
                .Where(attr => attr != null)
                .ToList();

            product.UpdateAttributes(attributeValues);
        }

        public async Task<Product> GetProductByIdAsync(Guid productId, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(productId, cancellationToken);

            return product;
        }
    }
}
