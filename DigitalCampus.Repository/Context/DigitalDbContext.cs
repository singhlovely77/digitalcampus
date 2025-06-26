using DigitalCampus.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalCampus.Repository.Context
{

    public partial class DigitalDbContext : DbContext
    {
        public DigitalDbContext()
        {
        }

        public DigitalDbContext(DbContextOptions<DigitalDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Department> Departments { get; set; }

        public virtual DbSet<DepartmentShift> DepartmentShifts { get; set; }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<UserProfile> UserProfiles { get; set; }

        public virtual DbSet<UserRole> UserRoles { get; set; }

        public virtual DbSet<UsersCardSwipe> UsersCardSwipes { get; set; }

        public virtual DbSet<UsersDailyAttendance> UsersDailyAttendances { get; set; }

        public virtual DbSet<UsersDailySchedule> UsersDailySchedules { get; set; }

        public virtual DbSet<UsersScheduleConfiguration> UsersScheduleConfigurations { get; set; }

        public virtual DbSet<Utility> Utilities { get; set; }

        //        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        //            => optionsBuilder.UseSqlServer("Server=tcp:digitaldev.database.windows.net,1433;Initial Catalog=DigitalDB_Dev;Persist Security Info=False;\nUser ID=digicharlie;\nPassword=India@243;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Department_DeptId");

                entity.ToTable("Department");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<DepartmentShift>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysutcdatetime())");
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.ModifiedBy).HasMaxLength(100);
                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.Department).WithMany(p => p.DepartmentShifts)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DepartmentShifts_Department_DeptId");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("PK_Users_UserId");

                entity.Property(e => e.UserId).ValueGeneratedNever();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetime())");
                entity.Property(e => e.Email).HasMaxLength(256);
                entity.Property(e => e.ModifiedBy).HasMaxLength(100);
                entity.Property(e => e.Username).HasMaxLength(100);
            });

            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("PK_UserProfiles_UserId");

                entity.Property(e => e.UserId).ValueGeneratedNever();
                entity.Property(e => e.Address1).HasMaxLength(255);
                entity.Property(e => e.Address2).HasMaxLength(255);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysutcdatetime())");
                entity.Property(e => e.FirstName).HasMaxLength(100);
                entity.Property(e => e.Gender).HasMaxLength(50);
                entity.Property(e => e.LanguagePreference).HasMaxLength(50);
                entity.Property(e => e.LastName).HasMaxLength(100);
                entity.Property(e => e.MiddleName).HasMaxLength(100);
                entity.Property(e => e.ModifiedBy).HasMaxLength(100);
                entity.Property(e => e.PhoneNumber).HasMaxLength(50);
                entity.Property(e => e.ProfilePictureUrl).HasMaxLength(500);
                entity.Property(e => e.Theme).HasMaxLength(50);
                entity.Property(e => e.TimeZone).HasMaxLength(50);

                entity.HasOne(d => d.Dept).WithMany(p => p.UserProfiles)
                    .HasForeignKey(d => d.DeptId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Role).WithMany(p => p.UserProfiles)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User).WithOne(p => p.UserProfile).HasForeignKey<UserProfile>(d => d.UserId);
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(e => e.RoleId).HasName("PK_UserRoles_RoleId");

                entity.Property(e => e.RoleId).ValueGeneratedNever();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysutcdatetime())");
                entity.Property(e => e.ModifiedBy).HasMaxLength(100);
                entity.Property(e => e.RoleDefinition).HasMaxLength(1000);
                entity.Property(e => e.RoleName).HasMaxLength(100);
            });

            modelBuilder.Entity<UsersCardSwipe>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_UsersCardSwipe_Id");

                entity.ToTable("UsersCardSwipe");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
                entity.Property(e => e.DigitalId).HasMaxLength(100);

                entity.HasOne(d => d.User).WithMany(p => p.UsersCardSwipes)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<UsersDailyAttendance>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_UsersDailyAttendance_Id");

                entity.ToTable("UsersDailyAttendance");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Status).WithMany(p => p.UsersDailyAttendances)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("FK_UsersDailyAttendance_Status");
            });

            modelBuilder.Entity<UsersDailySchedule>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_UsersDailySchedule_Id");

                entity.ToTable("UsersDailySchedule");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetime())");
                entity.Property(e => e.ModifiedBy).HasMaxLength(100);

                entity.HasOne(d => d.DepartmentShift).WithMany(p => p.UsersDailySchedules)
                    .HasForeignKey(d => d.DepartmentShiftId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersDailySchedule_Shift");

                entity.HasOne(d => d.User).WithMany(p => p.UsersDailySchedules)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UsersDailySchedule_User");
            });

            modelBuilder.Entity<UsersScheduleConfiguration>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_UsersScheduleConfiguration_Id");

                entity.ToTable("UsersScheduleConfiguration", tb => tb.HasTrigger("TR_UsersScheduleConfiguration_Insert_After"));

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetime())");
                entity.Property(e => e.DaysBinary)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();
                entity.Property(e => e.ModifiedBy).HasMaxLength(100);
                entity.Property(e => e.RecurrenceType).HasMaxLength(10);

                entity.HasOne(d => d.DepartmentShift).WithMany(p => p.UsersScheduleConfigurations)
                    .HasForeignKey(d => d.DepartmentShiftId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersScheduleConfiguration_Shift");

                entity.HasOne(d => d.User).WithMany(p => p.UsersScheduleConfigurations)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UsersScheduleConfiguration_User");
            });

            modelBuilder.Entity<Utility>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Utility_Id");

                entity.ToTable("Utility");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
                entity.Property(e => e.Code).HasMaxLength(20);
                entity.Property(e => e.Description).HasMaxLength(200);
                entity.Property(e => e.Type).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
