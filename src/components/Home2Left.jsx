import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Select,
  Collapse,
} from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";

import CollapseMenu from "./CollapseMenu";

const handleClick = () => {
  console.info("You clicked the Chip.");
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

function Home2Left() {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded-[20px] flex flex-col gap-3">
      {/* Filter */}
      <div className="flex items-center gap-7">
        <IconButton sx={{ color: "black" }}>
          <TuneIcon />
        </IconButton>
        <span className="text-black font-medium text-2xl">Filters</span>
      </div>
      <div className="flex gap-6">
        <span className="text-[#00000080] text-[18px] underline cursor-pointer">
          Clear
        </span>
        <span className="text-[#00000080] text-[18px] underline cursor-pointer">
          View last search
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          "Brand: Bertram",
          "Min length: 21'0' ft",
          "Max length: 31'0' ft",
          "Min price $350K",
        ].map((label) => (
          <Chip
            key={label}
            sx={{
              padding: "7px",
              backgroundColor: "#F5F5F5",
              borderRadius: "8px",
              color: "#00000080",
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              fontWeight: "400",
              width: "100%",
            }}
            label={label}
            onClick={handleClick}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox sx={{ color: "#00000080" }} />}
            label="New"
            sx={{ color: "black" }}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "#00000080" }} />}
            label="Used"
            sx={{ color: "black" }}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "#00000080" }} />}
            label="Brokerage"
            sx={{ color: "black" }}
          />
        </FormGroup>
      </FormControl>
      <CollapseMenu />
    </div>
  );
}

export default Home2Left;
