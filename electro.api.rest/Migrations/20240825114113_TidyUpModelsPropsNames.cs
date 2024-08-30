using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class TidyUpModelsPropsNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeliveryCost_Value",
                table: "DeliveriesDetails",
                newName: "Cost_Value");

            migrationBuilder.RenameColumn(
                name: "DeliveryCost_Currency",
                table: "DeliveriesDetails",
                newName: "Cost_Currency");

            migrationBuilder.RenameColumn(
                name: "DeliveryMethod",
                table: "DeliveriesDetails",
                newName: "Method");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Cost_Value",
                table: "DeliveriesDetails",
                newName: "DeliveryCost_Value");

            migrationBuilder.RenameColumn(
                name: "Cost_Currency",
                table: "DeliveriesDetails",
                newName: "DeliveryCost_Currency");

            migrationBuilder.RenameColumn(
                name: "Method",
                table: "DeliveriesDetails",
                newName: "DeliveryMethod");
        }
    }
}
