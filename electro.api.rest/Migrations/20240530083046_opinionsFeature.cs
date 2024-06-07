using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class opinionsFeature : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorName",
                table: "Opinions");

            migrationBuilder.DropColumn(
                name: "IsVerifiedPurchase",
                table: "Opinions");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Opinions",
                newName: "AuthorDisplayName");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Opinions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Opinions_UserId",
                table: "Opinions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Opinions_AspNetUsers_UserId",
                table: "Opinions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Opinions_AspNetUsers_UserId",
                table: "Opinions");

            migrationBuilder.DropIndex(
                name: "IX_Opinions_UserId",
                table: "Opinions");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Opinions");

            migrationBuilder.RenameColumn(
                name: "AuthorDisplayName",
                table: "Opinions",
                newName: "Title");

            migrationBuilder.AddColumn<string>(
                name: "AuthorName",
                table: "Opinions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsVerifiedPurchase",
                table: "Opinions",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
