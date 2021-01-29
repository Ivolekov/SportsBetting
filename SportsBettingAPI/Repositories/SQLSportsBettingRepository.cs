using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsBettingAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsBettingAPI.Repositories
{
    public class SQLSportsBettingRepository : ISportsBettingRepository
    {
        private readonly SportsBettingContext context;
        public SQLSportsBettingRepository(SportsBettingContext context)
        {
            this.context = context;
        }

        public async Task AddAsync(Event sportEvent)
        {
            await context.Event.AddAsync(sportEvent);
        }

        public async Task<EntityState> DeleteEventAsync(Event sportEvent)
        {
            return context.Event.Remove(sportEvent).State;
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await context.Event.ToListAsync();
        }

        public async Task<Event> GetEventByIdAsync(int id)
        {
            return await context.Event.FindAsync(id);
        }

        public async Task<Event> UpdateAsync(int id, Event sportEvent)
        {
            context.Entry(sportEvent).State = EntityState.Modified;
            var result = await SaveAsync();
            return sportEvent;
        }

        public async Task<int> SaveAsync()
        {
            return await context.SaveChangesAsync();
        }

        public async Task<bool> EventExistsAsync(int id) 
        {
            return await context.Event.AnyAsync(e => e.EventId == id);
        }

        public async Task<UserInfo> GetUserAsync(string email, string password)
        {
            return await context.UserInfo.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }
    }
}
