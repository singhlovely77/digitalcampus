using System.Linq.Expressions;

namespace DigitalCampus.Repository.Interface
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task SaveAsync();
        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);


        /// <summary>
        /// Query with a predicate expression
        /// </summary>
        //Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate);

        /// <summary>
        /// Persist changes to the database
        /// </summary>
        Task<int> SaveChangesAsync(T entity);
    }
}
