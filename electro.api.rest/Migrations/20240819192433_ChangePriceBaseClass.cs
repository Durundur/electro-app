using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class ChangePriceBaseClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price_Price",
                table: "Products",
                newName: "Price_Value");

            migrationBuilder.RenameColumn(
                name: "Price_OldPrice",
                table: "Products",
                newName: "Price_OldPriceValue");

            migrationBuilder.RenameColumn(
                name: "Price_Price",
                table: "OrdersProducts",
                newName: "Price_Value");

            migrationBuilder.RenameColumn(
                name: "Price_OldPrice",
                table: "OrdersProducts",
                newName: "Price_OldPriceValue");

            migrationBuilder.RenameColumn(
                name: "OrderStatus",
                table: "Orders",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "DeliveryCost_Price",
                table: "DeliveriesDetails",
                newName: "DeliveryCost_Value");

            migrationBuilder.RenameColumn(
                name: "TotalPrice_Price",
                table: "Carts",
                newName: "TotalPrice_Value");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price_Value",
                table: "Products",
                newName: "Price_Price");

            migrationBuilder.RenameColumn(
                name: "Price_OldPriceValue",
                table: "Products",
                newName: "Price_OldPrice");

            migrationBuilder.RenameColumn(
                name: "Price_Value",
                table: "OrdersProducts",
                newName: "Price_Price");

            migrationBuilder.RenameColumn(
                name: "Price_OldPriceValue",
                table: "OrdersProducts",
                newName: "Price_OldPrice");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Orders",
                newName: "OrderStatus");

            migrationBuilder.RenameColumn(
                name: "DeliveryCost_Value",
                table: "DeliveriesDetails",
                newName: "DeliveryCost_Price");

            migrationBuilder.RenameColumn(
                name: "TotalPrice_Value",
                table: "Carts",
                newName: "TotalPrice_Price");
        }
    }
}
