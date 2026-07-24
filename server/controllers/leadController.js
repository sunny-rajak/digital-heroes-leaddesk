import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ message: "Lead submitted successfully", lead });
  } catch (error) {
    res.status(500).json({ message: "Server error during submission" });
  }
};

export const getLeads = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching leads" });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Server error updating lead" });
  }
};
