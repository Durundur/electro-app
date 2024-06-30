using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class cartFeat2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartProduct_Carts_CartModelId",
                table: "CartProduct");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "CartProduct");

            migrationBuilder.RenameColumn(
                name: "CartModelId",
                table: "CartProduct",
                newName: "CartId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartProduct_Carts_CartId",
                table: "CartProduct",
                column: "CartId",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartProduct_Carts_CartId",
                table: "CartProduct");

            migrationBuilder.RenameColumn(
                name: "CartId",
                table: "CartProduct",
                newName: "CartModelId");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "CartProduct",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_CartProduct_Carts_CartModelId",
                table: "CartProduct",
                column: "CartModelId",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
