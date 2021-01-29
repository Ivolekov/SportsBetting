using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsBettingAPI.Models
{
    public interface ISportsBettingRepository
    {
        Task AddAsync(Event sportEvent);

        Task<Event> GetEventByIdAsync(int id);

        Task<IEnumerable<Event>> GetAllEventsAsync();

        Task<Event> UpdateAsync(int id, Event sportEvent);

        Task<EntityState> DeleteEventAsync(Event sportEvent);

        Task<int> SaveAsync();

        Task<bool> EventExistsAsync(int id);

        Task<UserInfo> GetUserAsync(string email, string password);
    }
}
