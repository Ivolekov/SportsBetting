using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace SportsBettingAPI.Models
{
    public partial class Event
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public double OddsForFirstTeam { get; set; }
        public double OddsForDraw { get; set; }
        public double OddsForSecondTeam { get; set; }
        public DateTime EventStartDate { get; set; }
    }
}
