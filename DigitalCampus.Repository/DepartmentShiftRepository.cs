using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Context;
using DigitalCampus.Repository.Interface;

namespace DigitalCampus.Repository
{
    public class DepartmentShiftRepository : Repository<DepartmentShift>, IDepartmentShiftRepository
    {
        private readonly DigitalDbContext _dbContext;

        public DepartmentShiftRepository(DigitalDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

    }
}