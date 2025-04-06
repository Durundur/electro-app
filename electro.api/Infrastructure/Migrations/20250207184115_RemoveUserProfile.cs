using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carts_UserProfiles_UserProfileId",
                table: "Carts");

            migrationBuilder.DropForeignKey(
                name: "FK_OpinionActions_UserProfiles_UserProfileId",
                table: "OpinionActions");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_UserProfiles_UserProfileId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOpinions_UserProfiles_UserProfileId",
                table: "ProductOpinions");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipients_UserProfiles_UserProfileId",
                table: "Recipients");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.RenameColumn(
                name: "UserProfileId",
                table: "Recipients",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Recipients_UserProfileId",
                table: "Recipients",
                newName: "IX_Recipients_UserId");

            migrationBuilder.RenameColumn(
                name: "UserProfileId",
                table: "ProductOpinions",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductOpinions_UserProfileId",
                table: "ProductOpinions",
                newName: "IX_ProductOpinions_UserId");

            migrationBuilder.RenameColumn(
                name: "UserProfileId",
                table: "Orders",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_UserProfileId",
                table: "Orders",
                newName: "IX_Orders_UserId");

            migrationBuilder.RenameColumn(
                name: "UserProfileId",
                table: "OpinionActions",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_OpinionActions_UserProfileId",
                table: "OpinionActions",
                newName: "IX_OpinionActions_UserId");

            migrationBuilder.RenameColumn(
                name: "UserProfileId",
                table: "Carts",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Carts_UserProfileId",
                table: "Carts",
                newName: "IX_Carts_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Carts_AspNetUsers_UserId",
                table: "Carts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OpinionActions_AspNetUsers_UserId",
                table: "OpinionActions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOpinions_AspNetUsers_UserId",
                table: "ProductOpinions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipients_AspNetUsers_UserId",
                table: "Recipients",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carts_AspNetUsers_UserId",
                table: "Carts");

            migrationBuilder.DropForeignKey(
                name: "FK_OpinionActions_AspNetUsers_UserId",
                table: "OpinionActions");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_UserId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOpinions_AspNetUsers_UserId",
                table: "ProductOpinions");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipients_AspNetUsers_UserId",
                table: "Recipients");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Recipients",
                newName: "UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_Recipients_UserId",
                table: "Recipients",
                newName: "IX_Recipients_UserProfileId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ProductOpinions",
                newName: "UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductOpinions_UserId",
                table: "ProductOpinions",
                newName: "IX_ProductOpinions_UserProfileId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Orders",
                newName: "UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                newName: "IX_Orders_UserProfileId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "OpinionActions",
                newName: "UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_OpinionActions_UserId",
                table: "OpinionActions",
                newName: "IX_OpinionActions_UserProfileId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Carts",
                newName: "UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_Carts_UserId",
                table: "Carts",
                newName: "IX_Carts_UserProfileId");

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserIdentityId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_UserIdentityId",
                        column: x => x.UserIdentityId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_UserIdentityId",
                table: "UserProfiles",
                column: "UserIdentityId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Carts_UserProfiles_UserProfileId",
                table: "Carts",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OpinionActions_UserProfiles_UserProfileId",
                table: "OpinionActions",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_UserProfiles_UserProfileId",
                table: "Orders",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOpinions_UserProfiles_UserProfileId",
                table: "ProductOpinions",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipients_UserProfiles_UserProfileId",
                table: "Recipients",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
