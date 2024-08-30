using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class TablesForOrderFeature5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartProducts_Carts_CartId",
                table: "CartProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_CartProducts_Products_ProductId",
                table: "CartProducts");

            migrationBuilder.DropTable(
                name: "DeliveryAddresses");

            migrationBuilder.DropTable(
                name: "DeliveryRecipients");

            migrationBuilder.DropTable(
                name: "SavedAddresses");

            migrationBuilder.DropTable(
                name: "SavedRecipients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CartProducts",
                table: "CartProducts");

            migrationBuilder.RenameTable(
                name: "CartProducts",
                newName: "CartProductModel");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "OrdersProducts",
                newName: "Price_Price");

            migrationBuilder.RenameColumn(
                name: "DeliveryCost",
                table: "DeliveriesDetails",
                newName: "DeliveryCost_Price");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "Carts",
                newName: "TotalPrice_Price");

            migrationBuilder.RenameColumn(
                name: "Count",
                table: "CartProductModel",
                newName: "Quantity");

            migrationBuilder.RenameIndex(
                name: "IX_CartProducts_ProductId",
                table: "CartProductModel",
                newName: "IX_CartProductModel_ProductId");

            migrationBuilder.AddColumn<string>(
                name: "Price_Currency",
                table: "OrdersProducts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Price_OldPrice",
                table: "OrdersProducts",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryCost_Currency",
                table: "DeliveriesDetails",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TotalPrice_Currency",
                table: "Carts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "CartProductModel",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CartProductModel",
                table: "CartProductModel",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "DeliveriesAddresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DeliveryDetailsId = table.Column<Guid>(type: "uuid", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false),
                    BuildingNumber = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    PostalCode = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveriesAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveriesAddresses_DeliveriesDetails_DeliveryDetailsId",
                        column: x => x.DeliveryDetailsId,
                        principalTable: "DeliveriesDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrdersRecipients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DeliveryDetailsId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    RecipientType = table.Column<int>(type: "integer", nullable: false),
                    NIP = table.Column<string>(type: "text", nullable: true),
                    CompanyName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdersRecipients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdersRecipients_DeliveriesDetails_DeliveryDetailsId",
                        column: x => x.DeliveryDetailsId,
                        principalTable: "DeliveriesDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SavedDeliveriesAddresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false),
                    BuildingNumber = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    PostalCode = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedDeliveriesAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedDeliveriesAddresses_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SavedOrdersRecipients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    RecipientType = table.Column<int>(type: "integer", nullable: false),
                    NIP = table.Column<string>(type: "text", nullable: true),
                    CompanyName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedOrdersRecipients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedOrdersRecipients_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartProductModel_CartId",
                table: "CartProductModel",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveriesAddresses_DeliveryDetailsId",
                table: "DeliveriesAddresses",
                column: "DeliveryDetailsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrdersRecipients_DeliveryDetailsId",
                table: "OrdersRecipients",
                column: "DeliveryDetailsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SavedDeliveriesAddresses_UserId",
                table: "SavedDeliveriesAddresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedOrdersRecipients_UserId",
                table: "SavedOrdersRecipients",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartProductModel_Carts_CartId",
                table: "CartProductModel",
                column: "CartId",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CartProductModel_Products_ProductId",
                table: "CartProductModel",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartProductModel_Carts_CartId",
                table: "CartProductModel");

            migrationBuilder.DropForeignKey(
                name: "FK_CartProductModel_Products_ProductId",
                table: "CartProductModel");

            migrationBuilder.DropTable(
                name: "DeliveriesAddresses");

            migrationBuilder.DropTable(
                name: "OrdersRecipients");

            migrationBuilder.DropTable(
                name: "SavedDeliveriesAddresses");

            migrationBuilder.DropTable(
                name: "SavedOrdersRecipients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CartProductModel",
                table: "CartProductModel");

            migrationBuilder.DropIndex(
                name: "IX_CartProductModel_CartId",
                table: "CartProductModel");

            migrationBuilder.DropColumn(
                name: "Price_Currency",
                table: "OrdersProducts");

            migrationBuilder.DropColumn(
                name: "Price_OldPrice",
                table: "OrdersProducts");

            migrationBuilder.DropColumn(
                name: "DeliveryCost_Currency",
                table: "DeliveriesDetails");

            migrationBuilder.DropColumn(
                name: "TotalPrice_Currency",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CartProductModel");

            migrationBuilder.RenameTable(
                name: "CartProductModel",
                newName: "CartProducts");

            migrationBuilder.RenameColumn(
                name: "Price_Price",
                table: "OrdersProducts",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "DeliveryCost_Price",
                table: "DeliveriesDetails",
                newName: "DeliveryCost");

            migrationBuilder.RenameColumn(
                name: "TotalPrice_Price",
                table: "Carts",
                newName: "TotalPrice");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "CartProducts",
                newName: "Count");

            migrationBuilder.RenameIndex(
                name: "IX_CartProductModel_ProductId",
                table: "CartProducts",
                newName: "IX_CartProducts_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CartProducts",
                table: "CartProducts",
                columns: new[] { "CartId", "ProductId" });

            migrationBuilder.CreateTable(
                name: "DeliveryAddresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DeliveryDetailsId = table.Column<Guid>(type: "uuid", nullable: false),
                    BuildingNumber = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    PostalCode = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryAddresses_DeliveriesDetails_DeliveryDetailsId",
                        column: x => x.DeliveryDetailsId,
                        principalTable: "DeliveriesDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryRecipients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DeliveryDetailsId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyName = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: false),
                    NIP = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    RecipientType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryRecipients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryRecipients_DeliveriesDetails_DeliveryDetailsId",
                        column: x => x.DeliveryDetailsId,
                        principalTable: "DeliveriesDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SavedAddresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    BuildingNumber = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    PostalCode = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedAddresses_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SavedRecipients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyName = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: false),
                    NIP = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    RecipientType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedRecipients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedRecipients_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryAddresses_DeliveryDetailsId",
                table: "DeliveryAddresses",
                column: "DeliveryDetailsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryRecipients_DeliveryDetailsId",
                table: "DeliveryRecipients",
                column: "DeliveryDetailsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SavedAddresses_UserId",
                table: "SavedAddresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedRecipients_UserId",
                table: "SavedRecipients",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartProducts_Carts_CartId",
                table: "CartProducts",
                column: "CartId",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CartProducts_Products_ProductId",
                table: "CartProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
