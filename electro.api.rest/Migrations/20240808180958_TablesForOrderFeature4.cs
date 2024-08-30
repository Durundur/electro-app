using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class TablesForOrderFeature4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DeliveriesDetails_DeliveryAddressId",
                table: "DeliveriesDetails");

            migrationBuilder.DropIndex(
                name: "IX_DeliveriesDetails_RecipientId",
                table: "DeliveriesDetails");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "SavedRecipients");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "SavedRecipients");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "SavedAddresses");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "SavedAddresses");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "DeliveryRecipients");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "DeliveryRecipients");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "DeliveryAddresses");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "DeliveryAddresses");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressId",
                table: "DeliveriesDetails");

            migrationBuilder.DropColumn(
                name: "RecipientId",
                table: "DeliveriesDetails");

            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryDetailsId",
                table: "DeliveryRecipients",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryDetailsId",
                table: "DeliveryAddresses",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryRecipients_DeliveryDetailsId",
                table: "DeliveryRecipients",
                column: "DeliveryDetailsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryAddresses_DeliveryDetailsId",
                table: "DeliveryAddresses",
                column: "DeliveryDetailsId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryAddresses_DeliveriesDetails_DeliveryDetailsId",
                table: "DeliveryAddresses",
                column: "DeliveryDetailsId",
                principalTable: "DeliveriesDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryRecipients_DeliveriesDetails_DeliveryDetailsId",
                table: "DeliveryRecipients",
                column: "DeliveryDetailsId",
                principalTable: "DeliveriesDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryAddresses_DeliveriesDetails_DeliveryDetailsId",
                table: "DeliveryAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryRecipients_DeliveriesDetails_DeliveryDetailsId",
                table: "DeliveryRecipients");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryRecipients_DeliveryDetailsId",
                table: "DeliveryRecipients");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryAddresses_DeliveryDetailsId",
                table: "DeliveryAddresses");

            migrationBuilder.DropColumn(
                name: "DeliveryDetailsId",
                table: "DeliveryRecipients");

            migrationBuilder.DropColumn(
                name: "DeliveryDetailsId",
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
                table: "SavedAddresses",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "SavedAddresses",
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

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "DeliveryAddresses",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "DeliveryAddresses",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryAddressId",
                table: "DeliveriesDetails",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "RecipientId",
                table: "DeliveriesDetails",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_DeliveriesDetails_DeliveryAddressId",
                table: "DeliveriesDetails",
                column: "DeliveryAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveriesDetails_RecipientId",
                table: "DeliveriesDetails",
                column: "RecipientId");
        }
    }
}
