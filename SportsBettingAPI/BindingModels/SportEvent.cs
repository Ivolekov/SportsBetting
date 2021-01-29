using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SportsBettingAPI.BindingModels
{
    public class SportEvent
    {
        public int EventId { get; set; }

        public string EventName { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger or equal to {1}")]
        public double OddsForFirstTeam { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger or equal to {1}")]
        public double OddsForDraw { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger or equal to {1}")]
        public double OddsForSecondTeam { get; set; }

        public DateTime EventStartDate { get; set; }
        
        public string TimeStamp { get; set; }
    }
}
