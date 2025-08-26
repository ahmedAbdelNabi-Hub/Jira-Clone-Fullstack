using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Specification.Helper
{
    public static class ExpressionBuilder
    {
      public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> expr1, Expression<Func<T, bool>> expr2)
        {
            var param = Expression.Parameter(typeof(T));
            var combined = Expression.AndAlso(
                Expression.Invoke(expr1, param),
                Expression.Invoke(expr2, param)
            );
            return Expression.Lambda<Func<T, bool>>(combined, param);
        }
    }
}
