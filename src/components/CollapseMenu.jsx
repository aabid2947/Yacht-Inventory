import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Collapse,
  Slider,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function CollapseMenu() {
  const [boatTypeOpen, setBoatTypeOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const [lengthOpen, setLengthOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [engineTypeOpen, setEngineTypeOpen] = useState(false);
  const [promotionsOpen, setPromotionsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([16200, 400000]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [onlineTourOpen, setOnlineTourOpen] = useState(false);
  const [fuelTypeOpen, setFuelTypeOpen] = useState(false);
  const [fuelMin, setFuelMin] = useState(0);
  const [fuelMax, setFuelMax] = useState(0);
  const [fuelTankOpen, setFuelTankOpen] = useState(false);
  const [fuelTankMin, setFuelTankMin] = useState(0);
  const [fuelTankMax, setFuelTankMax] = useState(0);
  const [beamOpen, setBeamOpen] = useState(false);
  const [beamMin, setBeamMin] = useState(0);
  const [beamMax, setBeamMax] = useState(0);
  const [draftOpen, setDraftOpen] = useState(false);
  const [draftMin, setDraftMin] = useState(0);
  const [draftMax, setDraftMax] = useState(0);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(0);
  const [dryWeightOpen, setDryWeightOpen] = useState(false);
  const [dryWeightMin, setDryWeightMin] = useState(0);
  const [dryWeightMax, setDryWeightMax] = useState(0);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleMinInputChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxInputChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setPriceRange([priceRange[0], value]);
  };

  const handleFuelMinChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setFuelMin(value);
  };

  const handleFuelMaxChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setFuelMax(value);
  };

  const handleFuelTankMinChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setFuelTankMin(value);
  };

  const handleFuelTankMaxChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setFuelTankMax(value);
  };

  const handleBeamMinChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setBeamMin(value);
  };

  const handleBeamMaxChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setBeamMax(value);
  };

  const handleDraftMinChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setDraftMin(value);
  };

  const handleDraftMaxChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setDraftMax(value);
  };

  const handleRangeMinChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setRangeMin(value);
  };

  const handleRangeMaxChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setRangeMax(value);
  };

  const handleDryWeightMinChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setDryWeightMin(value);
  };

  const handleDryWeightMaxChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setDryWeightMax(value);
  };

  return (
    <div>
      {/* Boat Type */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setBoatTypeOpen(!boatTypeOpen)}
        >
          <h3 className="text-black text-lg">Boat type</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {boatTypeOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={boatTypeOpen}>
          <FormGroup className="mt-3">
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="Bay boats"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="Bowrider"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="Center consoles"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Cruisers"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Dinghies"
              sx={{ color: "black" }}
            />
          </FormGroup>
        </Collapse>
      </div>

      {/* Brand */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setBrandOpen(!brandOpen)}
        >
          <h3 className="text-black text-lg">Brand</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {brandOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={brandOpen}>
          <FormGroup className="mt-3">
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="Bertram"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="Boston Whaler"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="Sea Ray"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Yamaha"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Grady-White"
              sx={{ color: "black" }}
            />
          </FormGroup>
        </Collapse>
      </div>

      {/* Mode */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setModeOpen(!modeOpen)}
        >
          <h3 className="text-black text-lg">Mode</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {modeOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={modeOpen}>
          <FormGroup className="mt-3">
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="New"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="Used"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Brokerage"
              sx={{ color: "black" }}
            />
          </FormGroup>
        </Collapse>
      </div>

      {/* Length */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setLengthOpen(!lengthOpen)}
        >
          <h3 className="text-black text-lg">Length</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {lengthOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={lengthOpen}>
          <FormGroup className="mt-3">
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="Under 20'"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="20' - 30'"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} defaultChecked />}
              label="30' - 40'"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="40' - 50'"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Over 50'"
              sx={{ color: "black" }}
            />
          </FormGroup>
        </Collapse>
      </div>

      {/* Price */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setPriceOpen(!priceOpen)}
        >
          <h3 className="text-black text-lg">Price</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {priceOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={priceOpen}>
          <div className="mt-3">
            <div className="flex gap-4 mb-4">
              <div style={{ flex: 1 }}>
                <div
                  style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
                >
                  Min:
                </div>
                <TextField
                  variant="outlined"
                  size="small"
                  value={`$${priceRange[0]}`}
                  onChange={handleMinInputChange}
                  inputProps={{
                    min: 0,
                    max: priceRange[1],
                    style: { textAlign: "center" },
                  }}
                  fullWidth
                />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
                >
                  Max:
                </div>
                <TextField
                  variant="outlined"
                  size="small"
                  value={`$${priceRange[1]}`}
                  onChange={handleMaxInputChange}
                  inputProps={{
                    min: priceRange[0],
                    style: { textAlign: "center" },
                  }}
                  fullWidth
                />
              </div>
            </div>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              min={0}
              max={500000}
              step={100}
              sx={{ color: "#2C4371" }}
            />
          </div>
        </Collapse>
      </div>

      {/* Year */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setYearOpen(!yearOpen)}
        >
          <h3 className="text-black text-lg">Year</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {yearOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={yearOpen}>
          <FormGroup className="mt-3">
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="2024"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="2023"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="2020 - 2022"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="2015 - 2019"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="2010 - 2014"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Before 2010"
              sx={{ color: "black" }}
            />
          </FormGroup>
        </Collapse>
      </div>

      {/* Engine Type */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setEngineTypeOpen(!engineTypeOpen)}
        >
          <h3 className="text-black text-lg">Engine Type</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {engineTypeOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={engineTypeOpen}>
          <FormGroup className="mt-3">
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Outboard"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Inboard"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Stern Drive"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Jet"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Electric"
              sx={{ color: "black" }}
            />
          </FormGroup>
        </Collapse>
      </div>

      {/* Promotions */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setPromotionsOpen(!promotionsOpen)}
        >
          <h3 className="text-black text-lg">Promotions</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {promotionsOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={promotionsOpen}>
          <FormGroup className="mt-3">
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="On Sale"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Special Offer"
              sx={{ color: "black" }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00000080" }} />}
              label="Clearance"
              sx={{ color: "black" }}
            />
          </FormGroup>
        </Collapse>
      </div>

      {/* Advanced Options */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setAdvancedOpen(!advancedOpen)}
        >
          <h3 className="text-black text-lg">Advanced Options</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {advancedOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={advancedOpen}>
          {/* Online tour */}
          <div className="mt-4">
            <div
              className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
              onClick={() => setOnlineTourOpen(!onlineTourOpen)}
            >
              <h4 className="text-black text-base">Online tour</h4>
              <IconButton
                sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
              >
                {onlineTourOpen ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </div>
            <Collapse in={onlineTourOpen}>
              <FormGroup className="mt-3">
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00000080" }} />}
                  label="Available"
                  sx={{ color: "black" }}
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00000080" }} />}
                  label="Not Available"
                  sx={{ color: "black" }}
                />
              </FormGroup>
            </Collapse>
          </div>
          {/* Fuel type */}
          <div className="mt-4">
            <div
              className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
              onClick={() => setFuelTypeOpen(!fuelTypeOpen)}
            >
              <h4 className="text-black text-base">Fuel type</h4>
              <IconButton
                sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
              >
                {fuelTypeOpen ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </div>
            <Collapse in={fuelTypeOpen}>
              <div className="flex gap-4 mt-3">
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: "#00000080",
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    Min:
                  </div>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={fuelMin}
                    onChange={handleFuelMinChange}
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                    fullWidth
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: "#00000080",
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    Max:
                  </div>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={fuelMax}
                    onChange={handleFuelMaxChange}
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                    fullWidth
                  />
                </div>
              </div>
            </Collapse>
          </div>
        </Collapse>
      </div>

      {/* Fuel tank capacity */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setFuelTankOpen(!fuelTankOpen)}
        >
          <h3 className="text-black text-lg">Fuel tank capacity</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {fuelTankOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={fuelTankOpen}>
          <div className="flex gap-4 mt-3">
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Min:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={fuelTankMin}
                onChange={handleFuelTankMinChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Max:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={fuelTankMax}
                onChange={handleFuelTankMaxChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
          </div>
        </Collapse>
      </div>

      {/* Beam */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setBeamOpen(!beamOpen)}
        >
          <h3 className="text-black text-lg">Beam</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {beamOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={beamOpen}>
          <div className="flex gap-4 mt-3">
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Min:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={beamMin}
                onChange={handleBeamMinChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Max:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={beamMax}
                onChange={handleBeamMaxChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
          </div>
        </Collapse>
      </div>

      {/* Draft */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setDraftOpen(!draftOpen)}
        >
          <h3 className="text-black text-lg">Draft</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {draftOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={draftOpen}>
          <div className="flex gap-4 mt-3">
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Min:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={draftMin}
                onChange={handleDraftMinChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Max:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={draftMax}
                onChange={handleDraftMaxChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
          </div>
        </Collapse>
      </div>

      {/* Range */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setRangeOpen(!rangeOpen)}
        >
          <h3 className="text-black text-lg">Range</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {rangeOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={rangeOpen}>
          <div className="flex gap-4 mt-3">
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Min:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={rangeMin}
                onChange={handleRangeMinChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Max:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={rangeMax}
                onChange={handleRangeMaxChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
          </div>
        </Collapse>
      </div>

      {/* Dry weight */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer border-b border-[#00000033] pb-3"
          onClick={() => setDryWeightOpen(!dryWeightOpen)}
        >
          <h3 className="text-black text-lg">Dry weight</h3>
          <IconButton
            sx={{ border: "1px solid #00000033", borderRadius: "50%" }}
          >
            {dryWeightOpen ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <Collapse in={dryWeightOpen}>
          <div className="flex gap-4 mt-3">
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Min:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={dryWeightMin}
                onChange={handleDryWeightMinChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#00000080", fontSize: 14, marginBottom: 4 }}
              >
                Max:
              </div>
              <TextField
                variant="outlined"
                size="small"
                value={dryWeightMax}
                onChange={handleDryWeightMaxChange}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                fullWidth
              />
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default CollapseMenu;
