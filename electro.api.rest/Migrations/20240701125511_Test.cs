using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class Test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CartProduct",
                table: "CartProduct");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CartProduct",
                table: "CartProduct",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CartProduct_CartId",
                table: "CartProduct",
                column: "CartId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CartProduct",
                table: "CartProduct");

            migrationBuilder.DropIndex(
                name: "IX_CartProduct_CartId",
                table: "CartProduct");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CartProduct",
                table: "CartProduct",
                columns: new[] { "CartId", "Id" });
        }
    }
}
