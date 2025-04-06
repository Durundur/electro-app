using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Refactor2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OpinionReactions_AspNetUsers_UserId",
                table: "OpinionReactions");

            migrationBuilder.DropForeignKey(
                name: "FK_OpinionReactions_ProductOpinions_OpinionId",
                table: "OpinionReactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OpinionReactions",
                table: "OpinionReactions");

            migrationBuilder.RenameTable(
                name: "OpinionReactions",
                newName: "ProductOpinionReactions");

            migrationBuilder.RenameIndex(
                name: "IX_OpinionReactions_UserId",
                table: "ProductOpinionReactions",
                newName: "IX_ProductOpinionReactions_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_OpinionReactions_OpinionId",
                table: "ProductOpinionReactions",
                newName: "IX_ProductOpinionReactions_OpinionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductOpinionReactions",
                table: "ProductOpinionReactions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOpinionReactions_AspNetUsers_UserId",
                table: "ProductOpinionReactions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOpinionReactions_ProductOpinions_OpinionId",
                table: "ProductOpinionReactions",
                column: "OpinionId",
                principalTable: "ProductOpinions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductOpinionReactions_AspNetUsers_UserId",
                table: "ProductOpinionReactions");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOpinionReactions_ProductOpinions_OpinionId",
                table: "ProductOpinionReactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductOpinionReactions",
                table: "ProductOpinionReactions");

            migrationBuilder.RenameTable(
                name: "ProductOpinionReactions",
                newName: "OpinionReactions");

            migrationBuilder.RenameIndex(
                name: "IX_ProductOpinionReactions_UserId",
                table: "OpinionReactions",
                newName: "IX_OpinionReactions_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductOpinionReactions_OpinionId",
                table: "OpinionReactions",
                newName: "IX_OpinionReactions_OpinionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OpinionReactions",
                table: "OpinionReactions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OpinionReactions_AspNetUsers_UserId",
                table: "OpinionReactions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OpinionReactions_ProductOpinions_OpinionId",
                table: "OpinionReactions",
                column: "OpinionId",
                principalTable: "ProductOpinions",
                principalColumn: "Id");
        }
    }
}
