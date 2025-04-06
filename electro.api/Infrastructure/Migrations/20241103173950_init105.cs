using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init105 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderNumber",
                table: "SubCategories",
                newName: "DisplayOrder");

            migrationBuilder.RenameColumn(
                name: "OrderNumber",
                table: "Groups",
                newName: "DisplayOrder");

            migrationBuilder.RenameColumn(
                name: "OrderNumber",
                table: "Categories",
                newName: "DisplayOrder");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DisplayOrder",
                table: "SubCategories",
                newName: "OrderNumber");

            migrationBuilder.RenameColumn(
                name: "DisplayOrder",
                table: "Groups",
                newName: "OrderNumber");

            migrationBuilder.RenameColumn(
                name: "DisplayOrder",
                table: "Categories",
                newName: "OrderNumber");
        }
    }
}
