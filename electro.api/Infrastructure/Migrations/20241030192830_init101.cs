using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init101 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
                name: "FK_ProductAttributes_AttributeDefinitions_AttributeDefinitionId",
                table: "ProductAttributes",
                column: "AttributeDefinitionId",
                principalTable: "AttributeDefinitions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductAttributes_AttributeDefinitions_AttributeDefinitionId",
                table: "ProductAttributes");
        }
    }
}
