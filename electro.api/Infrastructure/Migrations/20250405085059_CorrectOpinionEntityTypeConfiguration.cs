using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CorrectOpinionEntityTypeConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductOpinions_Products_ProductId",
                table: "ProductOpinions");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOpinions_Products_ProductId",
                table: "ProductOpinions",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductOpinions_Products_ProductId",
                table: "ProductOpinions");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOpinions_Products_ProductId",
                table: "ProductOpinions",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
