using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Taskify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateTableSprintAddStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Sprints");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Sprints",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Sprints");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Sprints",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
