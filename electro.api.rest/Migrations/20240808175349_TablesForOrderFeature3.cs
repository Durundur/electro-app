using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class TablesForOrderFeature3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryAddresses_AspNetUsers_UserModelId",
                table: "DeliveryAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryRecipients_AspNetUsers_UserModelId",
                table: "DeliveryRecipients");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedAddresses_AspNetUsers_UserModelId",
                table: "SavedAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedRecipients_AspNetUsers_UserModelId",
                table: "SavedRecipients");

            migrationBuilder.DropIndex(
                name: "IX_SavedRecipients_UserModelId",
                table: "SavedRecipients");

            migrationBuilder.DropIndex(
                name: "IX_SavedAddresses_UserModelId",
                table: "SavedAddresses");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryRecipients_UserModelId",
                table: "DeliveryRecipients");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryAddresses_UserModelId",
                table: "DeliveryAddresses");

            migrationBuilder.DropColumn(
                name: "UserModelId",
                table: "SavedRecipients");

            migrationBuilder.DropColumn(
                name: "UserModelId",
                table: "SavedAddresses");

            migrationBuilder.DropColumn(
                name: "UserModelId",
                table: "DeliveryRecipients");

            migrationBuilder.DropColumn(
                name: "UserModelId",
                table: "DeliveryAddresses");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "SavedRecipients",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "SavedRecipients",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "DeliveryRecipients",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "DeliveryRecipients",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "SavedRecipients");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "SavedRecipients");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "DeliveryRecipients");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "DeliveryRecipients");

            migrationBuilder.AddColumn<Guid>(
                name: "UserModelId",
                table: "SavedRecipients",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserModelId",
                table: "SavedAddresses",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserModelId",
                table: "DeliveryRecipients",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserModelId",
                table: "DeliveryAddresses",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SavedRecipients_UserModelId",
                table: "SavedRecipients",
                column: "UserModelId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAddresses_UserModelId",
                table: "SavedAddresses",
                column: "UserModelId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryRecipients_UserModelId",
                table: "DeliveryRecipients",
                column: "UserModelId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryAddresses_UserModelId",
                table: "DeliveryAddresses",
                column: "UserModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryAddresses_AspNetUsers_UserModelId",
                table: "DeliveryAddresses",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryRecipients_AspNetUsers_UserModelId",
                table: "DeliveryRecipients",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedAddresses_AspNetUsers_UserModelId",
                table: "SavedAddresses",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedRecipients_AspNetUsers_UserModelId",
                table: "SavedRecipients",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
