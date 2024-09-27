using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class AvgRatingChangeColumnName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AvgOpinionsRating",
                table: "Products",
                newName: "AverageOpinionsRating");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AverageOpinionsRating",
                table: "Products",
                newName: "AvgOpinionsRating");
        }
    }
}
