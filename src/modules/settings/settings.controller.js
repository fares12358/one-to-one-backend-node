import Settings from "./settings.model.js";

const DEFAULTS = {
  brandName:         "One to One",
  primaryColor:      "#037338",
  accentColor:       "#96C422",
  email:             "info@oneto-one.com",
  phone:             "+20 128 763 6986",
  whatsapp:          "+20 128 763 6986",
  website:           "www.oneto-one.com",
  location:          "All Egypt",
  socialLinks:       { facebook: "", linkedin: "", instagram: "", whatsapp: "https://wa.me/201287636986" },
  logoUrl:           "",
  logoWhiteUrl:      "",
  logoPublicId:      "",
  logoWhitePublicId: "",
};

const ALLOWED_FIELDS = [
  "brandName", "primaryColor", "accentColor",
  "email", "phone", "whatsapp", "website", "location",
  "socialLinks",
  "logoUrl", "logoWhiteUrl",
  "logoPublicId", "logoWhitePublicId",
];

// ─── GET /api/settings ─────────────────────────────────────────────────────────
export const get = async (req, res, next) => {
  try {
    const settings = await Settings.findOne({}).lean(); // lean — read-only
    res.json({ success: true, data: settings || DEFAULTS });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/settings  (protected) ────────────────────────────────────────────
export const update = async (req, res, next) => {
  try {
    const payload = {};
    ALLOWED_FIELDS.forEach((key) => {
      if (req.body[key] !== undefined) payload[key] = req.body[key];
    });

    if (payload.socialLinks) {
      const { facebook, linkedin, instagram, whatsapp } = payload.socialLinks;
      payload.socialLinks = { facebook, linkedin, instagram, whatsapp };
    }

    const updated = await Settings.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true, runValidators: false }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};
