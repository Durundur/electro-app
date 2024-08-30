using electro.api.rest.Models.Auth;

namespace electro.api.rest.Models.Opinion
{
    public class OpinionActionModel : BaseModel
    {
        public Guid UserId { get; set; }
        public UserModel User { get; set; }
        public Guid OpinionId { get; set; }
        public OpinionModel Opinion { get; set; }
        public OpinionActionType ActionType { get; set; }
    }
}
