using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init000 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryAttributeDefinition");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "AttributeDefinitions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AttributeDefinitions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "AttributeDefinitions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubCategoryId",
                table: "AttributeDefinitions",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeDefinitions_CategoryId",
                table: "AttributeDefinitions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeDefinitions_GroupId",
                table: "AttributeDefinitions",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeDefinitions_SubCategoryId",
                table: "AttributeDefinitions",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_AttributeDefinitions_Categories_CategoryId",
                table: "AttributeDefinitions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AttributeDefinitions_Groups_GroupId",
                table: "AttributeDefinitions",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AttributeDefinitions_SubCategories_SubCategoryId",
                table: "AttributeDefinitions",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttributeDefinitions_Categories_CategoryId",
                table: "AttributeDefinitions");

            migrationBuilder.DropForeignKey(
                name: "FK_AttributeDefinitions_Groups_GroupId",
                table: "AttributeDefinitions");

            migrationBuilder.DropForeignKey(
                name: "FK_AttributeDefinitions_SubCategories_SubCategoryId",
                table: "AttributeDefinitions");

            migrationBuilder.DropIndex(
                name: "IX_AttributeDefinitions_CategoryId",
                table: "AttributeDefinitions");

            migrationBuilder.DropIndex(
                name: "IX_AttributeDefinitions_GroupId",
                table: "AttributeDefinitions");

            migrationBuilder.DropIndex(
                name: "IX_AttributeDefinitions_SubCategoryId",
                table: "AttributeDefinitions");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "AttributeDefinitions");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AttributeDefinitions");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "AttributeDefinitions");

            migrationBuilder.DropColumn(
                name: "SubCategoryId",
                table: "AttributeDefinitions");

            migrationBuilder.CreateTable(
                name: "CategoryAttributeDefinition",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    AttributeDefinitionId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryAttributeDefinition", x => new { x.CategoryId, x.AttributeDefinitionId });
                    table.ForeignKey(
                        name: "FK_CategoryAttributeDefinition_AttributeDefinitions_AttributeD~",
                        column: x => x.AttributeDefinitionId,
                        principalTable: "AttributeDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryAttributeDefinition_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryAttributeDefinition_AttributeDefinitionId",
                table: "CategoryAttributeDefinition",
                column: "AttributeDefinitionId");
        }
    }
}
