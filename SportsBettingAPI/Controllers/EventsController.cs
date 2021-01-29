using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsBettingAPI.BindingModels;
using SportsBettingAPI.Models;
using SportsBettingAPI.Repositories;

namespace SportsBettingAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly ISportsBettingRepository _repository;

        public EventsController(ISportsBettingRepository repository)
        {
            _repository = repository;
        }

        // GET: api/events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            try
            {
                var eventsList = await _repository.GetAllEventsAsync();

                if (eventsList.Count() == 0)
                {
                    return NotFound(eventsList);
                }
                else
                {
                    return Ok(eventsList);
                }
                
                
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            try
            {
                var sportEvent = await _repository.GetEventByIdAsync(id);
                if (sportEvent == null)
                {
                    return NotFound();
                }

                return sportEvent;
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        // PUT: api/Events/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, SportEvent eventModel)
        {
            try
            {
                if (id != eventModel.EventId || id == 0)
                {
                    return BadRequest();
                }

                Event sportEvent = new Event()
                {
                    EventId = eventModel.EventId,
                    EventName = eventModel.EventName,
                    EventStartDate = eventModel.EventStartDate,
                    OddsForFirstTeam = eventModel.OddsForFirstTeam,
                    OddsForDraw = eventModel.OddsForDraw,
                    OddsForSecondTeam = eventModel.OddsForSecondTeam
                };

                await _repository.UpdateAsync(id, sportEvent);

                try
                {
                    await _repository.SaveAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (! await _repository.EventExistsAsync(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // POST: api/Events
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(SportEvent eventModel)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(eventModel.TimeStamp))
                {
                    return BadRequest("TimeStamp is required");
                }

                DateTime eventStartDate = DateTime.ParseExact(eventModel.TimeStamp, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
                Event sportEvent = new Event()
                {
                    EventId = eventModel.EventId,
                    EventName = eventModel.EventName,
                    EventStartDate = eventStartDate,
                    OddsForFirstTeam = eventModel.OddsForFirstTeam,
                    OddsForDraw = eventModel.OddsForDraw,
                    OddsForSecondTeam = eventModel.OddsForSecondTeam
                };

                await _repository.AddAsync(sportEvent);
                await _repository.SaveAsync();
                return await _repository.GetEventByIdAsync(sportEvent.EventId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Event>> DeleteEvent(int id)
        {
            try
            {
                var sportEvent = await _repository.GetEventByIdAsync(id);
                if (sportEvent == null)
                {
                    return NotFound();
                }

                var result = _repository.DeleteEventAsync(sportEvent);
                
                await _repository.SaveAsync();

                return sportEvent;
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
