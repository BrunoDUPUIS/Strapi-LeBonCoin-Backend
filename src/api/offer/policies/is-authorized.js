module.exports = async (policyContext, config, { strapi }) => {
  const userId = policyContext.state.user.id;
  console.log(userId);

  if (policyContext.request.params.id) {
    const offerId = policyContext.request.params.id;
    console.log(offerId);
    const offer = await strapi.entityService.findOne(
      "api::offer.offer",
      offerId,
      { populate: ["owner"] }
    );
    console.log(offer);
    console.log(offer.owner.id);
    const ownerId = offer.owner.id;
    if (userId !== ownerId) {
      return false;
    } else {
      return true;
    }
  } else {
    // console.log(policyContext.request.body);
    const ownerId = JSON.parse(policyContext.request.body.data).owner;
    console.log(ownerId);
    if (userId !== ownerId) {
      return false;
    } else {
      return true;
    }
  }
};
