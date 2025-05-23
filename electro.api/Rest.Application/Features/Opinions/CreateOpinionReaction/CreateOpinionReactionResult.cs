﻿using Domain.Aggregates.ProductCatalogAggregate;

namespace Rest.Application.Features.Opinions.CreateOpinionReaction
{
    public class CreateOpinionReactionResult
    {
        public OpinionReactionType ReactionType { get; set; }
        public int LikesCount { get; set; }
        public int DislikesCount { get; set; }
    }
}
