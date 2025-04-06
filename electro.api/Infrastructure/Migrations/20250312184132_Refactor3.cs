using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Refactor3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_ProductOpinionReactions_UserId",
                table: "ProductOpinionReactions");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProductOpinionReactions");

            migrationBuilder.AlterColumn<Guid>(
                name: "OpinionId",
                table: "ProductOpinionReactions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductOpinionReactions",
                table: "ProductOpinionReactions",
                columns: new[] { "UserId", "OpinionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOpinionReactions_AspNetUsers_UserId",
                table: "ProductOpinionReactions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOpinionReactions_ProductOpinions_OpinionId",
                table: "ProductOpinionReactions",
                column: "OpinionId",
                principalTable: "ProductOpinions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.AlterColumn<Guid>(
                name: "OpinionId",
                table: "ProductOpinionReactions",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "ProductOpinionReactions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductOpinionReactions",
                table: "ProductOpinionReactions",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOpinionReactions_UserId",
                table: "ProductOpinionReactions",
                column: "UserId");

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
    }
}
