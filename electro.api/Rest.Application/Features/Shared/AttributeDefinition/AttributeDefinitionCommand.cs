﻿using Domain.Aggregates.ProductHierarchyAggregate;

namespace Rest.Application.Features.Shared.AttributeDefinition
{
    public class AttributeDefinitionCommand
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public AttributeType Type { get; set; }
        public bool IsRequired { get; set; }
        public string Description { get; set; }
        public bool IsFilterable { get; set; }
    }
}
