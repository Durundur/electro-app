using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class TablesForOrderFeature2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveriesDetails_DeliveryAddresses_DeliveryAddressId",
                table: "DeliveriesDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveriesDetails_DeliveryRecipients_RecipientId",
                table: "DeliveriesDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryAddresses_AspNetUsers_UserId",
                table: "DeliveryAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryRecipients_AspNetUsers_UserId",
                table: "DeliveryRecipients");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryRecipients_UserId",
                table: "DeliveryRecipients");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryAddresses_UserId",
                table: "DeliveryAddresses");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "DeliveryRecipients");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DeliveryRecipients");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "DeliveryAddresses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DeliveryAddresses");

            migrationBuilder.CreateTable(
                name: "SavedAddresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false),
                    BuildingNumber = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    PostalCode = table.Column<string>(type: "text", nullable: false),
                    UserModelId = table.Column<Guid>(type: "uuid", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedAddresses_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedAddresses_AspNetUsers_UserModelId",
                        column: x => x.UserModelId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SavedRecipients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    RecipientType = table.Column<int>(type: "integer", nullable: false),
                    NIP = table.Column<string>(type: "text", nullable: true),
                    CompanyName = table.Column<string>(type: "text", nullable: true),
                    UserModelId = table.Column<Guid>(type: "uuid", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedRecipients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedRecipients_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedRecipients_AspNetUsers_UserModelId",
                        column: x => x.UserModelId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedAddresses_UserId",
                table: "SavedAddresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAddresses_UserModelId",
                table: "SavedAddresses",
                column: "UserModelId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedRecipients_UserId",
                table: "SavedRecipients",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedRecipients_UserModelId",
                table: "SavedRecipients",
                column: "UserModelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedAddresses");

            migrationBuilder.DropTable(
                name: "SavedRecipients");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "DeliveryRecipients",
                type: "character varying(21)",
                maxLength: 21,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "DeliveryRecipients",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "DeliveryAddresses",
                type: "character varying(21)",
                maxLength: 21,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "DeliveryAddresses",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryRecipients_UserId",
                table: "DeliveryRecipients",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryAddresses_UserId",
                table: "DeliveryAddresses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveriesDetails_DeliveryAddresses_DeliveryAddressId",
                table: "DeliveriesDetails",
                column: "DeliveryAddressId",
                principalTable: "DeliveryAddresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveriesDetails_DeliveryRecipients_RecipientId",
                table: "DeliveriesDetails",
                column: "RecipientId",
                principalTable: "DeliveryRecipients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryAddresses_AspNetUsers_UserId",
                table: "DeliveryAddresses",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryRecipients_AspNetUsers_UserId",
                table: "DeliveryRecipients",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
