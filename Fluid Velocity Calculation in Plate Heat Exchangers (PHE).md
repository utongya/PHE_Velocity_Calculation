# Engineering Guide: Fluid Velocity Calculation in Plate Heat Exchangers (PHE)

The calculation of fluid velocity within a Plate Heat Exchanger (PHE) is essential for determining the heat transfer coefficient, pressure drop, and overall performance of the unit. The velocity must be maintained within an optimal range—high enough to induce turbulence for efficient heat transfer, but low enough to prevent excessive pressure drop and erosion.

The fundamental principle is based on the continuity equation, where the volumetric flow rate is divided by the effective cross-sectional flow area.

## 1. Required Input Information

To accurately calculate the fluid velocity ($v$), the following design and operational parameters are required:

| Category | Parameter | Symbol | Unit | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Operational** | Volumetric Flow Rate (per fluid side) | $Q$ | $\text{m}^3/\text{s}$ or $\text{L}/\text{s}$ | The total flow rate of the fluid (hot or cold) entering the PHE. |
| **Design** | Effective Plate Width | $W_p$ | $\text{m}$ | The width of the plate available for fluid flow (inside the gasket). |
| **Design** | Plate Pitch (or Spacing) | $p$ | $\text{m}$ | The distance between two adjacent plates (plate thickness + gap). |
| **Design** | Plate Thickness | $t$ | $\text{m}$ | The thickness of a single plate. |
| **Design** | Number of Plates | $N_{pl}$ | - | Total number of plates in the PHE. |
| **Design** | Number of Passes | $N_{pass}$ | - | The number of times the fluid traverses the entire length of the heat exchanger. |
| **Design** | Chevron Angle | $\beta$ | $\text{degrees}$ | The angle of the corrugations (e.g., $30^\circ$, $60^\circ$). This is critical for turbulence and pressure drop, but not for the *average* velocity calculation. |

## 2. Core Calculation Methodology

The average fluid velocity ($v$) in the plate channels is calculated using the following general formula:

$$
v = \frac{Q}{A_{flow}}
$$

Where:
*   $v$ is the average fluid velocity ($\text{m}/\text{s}$)
*   $Q$ is the volumetric flow rate ($\text{m}^3/\text{s}$)
*   $A_{flow}$ is the total effective cross-sectional flow area ($\text{m}^2$)

The complexity lies in accurately determining the **Total Effective Cross-Sectional Flow Area** ($A_{flow}$), which depends on the plate geometry and the flow arrangement (number of passes).

### 2.1. Calculating the Flow Gap ($b$)

The actual gap between two plates where the fluid flows is the **Flow Gap** ($b$).

$$
b = p - t
$$

Where:
*   $b$ is the flow gap ($\text{m}$)
*   $p$ is the plate pitch ($\text{m}$)
*   $t$ is the plate thickness ($\text{m}$)

### 2.2. Calculating the Number of Channels per Fluid Side ($N_{ch}$)

The total number of channels available for the fluid to flow through is a function of the total number of plates and the number of passes.

$$
N_{ch} = \frac{N_{pl} - 1}{N_{pass}}
$$

Where:
*   $N_{ch}$ is the number of channels per fluid side (must be an integer).
*   $N_{pl}$ is the total number of plates.
*   $N_{pass}$ is the number of passes for that fluid side.

**Note on $N_{pl}$:** The total number of plates $N_{pl}$ includes the two end plates (one fixed, one movable), but only the plates *between* the end plates create channels. The number of channels is always $N_{pl} - 1$. This total number of channels is then divided equally among the passes.

### 2.3. Calculating the Total Effective Cross-Sectional Flow Area ($A_{flow}$)

The total flow area is the sum of the cross-sectional area of all channels the fluid passes through simultaneously.

$$
A_{flow} = N_{ch} \times (W_p \times b) \times \phi
$$

Where:
*   $A_{flow}$ is the total effective cross-sectional flow area ($\text{m}^2$).
*   $N_{ch}$ is the number of channels per fluid side.
*   $W_p$ is the effective plate width ($\text{m}$).
*   $b$ is the flow gap ($\text{m}$).
*   $\phi$ is the **Corrugation Factor** (or Enlargement Factor).

#### The Corrugation Factor ($\phi$)

The corrugations (chevron patterns) on the plates increase the actual heat transfer surface area and the flow path length. This factor accounts for the increased flow area due to the corrugations.

$$
\phi = \frac{\text{Actual Flow Path Length}}{\text{Projected Flow Path Length}}
$$

For typical chevron plates, $\phi$ is generally in the range of **1.04 to 1.25**. For a more precise calculation, the factor is often determined by the plate manufacturer based on the specific corrugation geometry. If the exact value is unknown, a value of **1.15** is a common engineering approximation.

## 3. Calculation Steps for Different Configurations

The primary difference between configurations is how the **Number of Channels per Fluid Side ($N_{ch}$)** is determined.

### 3.1. Single-Pass Configuration

In a single-pass configuration, the fluid enters one port and exits the other on the same side, traversing the entire length once.

*   **Number of Passes ($N_{pass}$):** $1$
*   **Number of Channels ($N_{ch}$):** $N_{ch} = N_{pl} - 1$

**Step 1: Calculate Flow Gap ($b$)**
$$b = p - t$$

**Step 2: Calculate Number of Channels ($N_{ch}$)**
$$N_{ch} = N_{pl} - 1$$

**Step 3: Calculate Total Effective Flow Area ($A_{flow}$)**
$$A_{flow} = N_{ch} \times W_p \times b \times \phi$$

**Step 4: Calculate Fluid Velocity ($v$)**
$$v = \frac{Q}{A_{flow}}$$

### 3.2. Multi-Pass Configuration (e.g., U-Type or Z-Type)

In a multi-pass configuration, the fluid is directed to flow back and forth across the plate stack multiple times.

*   **Number of Passes ($N_{pass}$):** $2, 3, 4, \dots$
*   **Number of Channels ($N_{ch}$):** $N_{ch} = \frac{N_{pl} - 1}{N_{pass}}$

**Step 1: Calculate Flow Gap ($b$)**
$$b = p - t$$

**Step 2: Calculate Number of Channels ($N_{ch}$)**
$$N_{ch} = \frac{N_{pl} - 1}{N_{pass}}$$
*(Ensure this results in an integer. If not, the PHE design is physically impossible or the plate count is incorrect for the specified pass arrangement.)*

**Step 3: Calculate Total Effective Flow Area ($A_{flow}$)**
$$A_{flow} = N_{ch} \times W_p \times b \times \phi$$

**Step 4: Calculate Fluid Velocity ($v$)**
$$v = \frac{Q}{A_{flow}}$$

## 4. Practical Example

Consider a hot fluid side of a PHE with the following parameters:

| Parameter | Value | Unit |
| :--- | :--- | :--- |
| Volumetric Flow Rate ($Q$) | $0.01$ | $\text{m}^3/\text{s}$ |
| Total Number of Plates ($N_{pl}$) | $51$ | - |
| Number of Passes ($N_{pass}$) | $2$ | - |
| Plate Pitch ($p$) | $0.004$ | $\text{m}$ |
| Plate Thickness ($t$) | $0.0006$ | $\text{m}$ |
| Effective Plate Width ($W_p$) | $0.5$ | $\text{m}$ |
| Corrugation Factor ($\phi$) | $1.15$ | - |

**Calculation:**

**1. Flow Gap ($b$):**
$$b = p - t = 0.004 \text{ m} - 0.0006 \text{ m} = 0.0034 \text{ m}$$

**2. Number of Channels ($N_{ch}$):**
$$N_{ch} = \frac{N_{pl} - 1}{N_{pass}} = \frac{51 - 1}{2} = \frac{50}{2} = 25 \text{ channels}$$

**3. Total Effective Flow Area ($A_{flow}$):**
$$A_{flow} = N_{ch} \times W_p \times b \times \phi$$
$$A_{flow} = 25 \times 0.5 \text{ m} \times 0.0034 \text{ m} \times 1.15$$
$$A_{flow} = 0.048875 \text{ m}^2$$

**4. Fluid Velocity ($v$):**
$$v = \frac{Q}{A_{flow}} = \frac{0.01 \text{ m}^3/\text{s}}{0.048875 \text{ m}^2}$$
$$v \approx 0.2046 \text{ m}/\text{s}$$

## 5. Port Velocity Calculation

While the channel velocity ($v$) is crucial for heat transfer, the **Port Velocity** ($v_{port}$) is critical for minimizing erosion and excessive pressure drop at the inlet and outlet connections.

$$
v_{port} = \frac{Q}{A_{port}}
$$

Where:
*   $v_{port}$ is the fluid velocity in the port ($\text{m}/\text{s}$)
*   $Q$ is the volumetric flow rate ($\text{m}^3/\text{s}$)
*   $A_{port}$ is the cross-sectional area of the port ($\text{m}^2$)

The port area is typically calculated from the nominal port diameter ($D_{port}$):

$$
A_{port} = \frac{\pi \times D_{port}^2}{4}
$$

The recommended range for port velocity is generally higher than channel velocity, often between **2 to 5 $\text{m}/\text{s}$** for water, but this is highly dependent on the fluid and material of construction.

## 6. Engineering Considerations

*   **Optimal Velocity Range:** For most fluids (especially water), the recommended average velocity ($v$) is typically higher 0.6 $\text{m}/\text{s}$**. Velocities below this value can lead to fouling, while velocities above can cause excessive pressure drop and erosion.
*   **Mass Velocity ($G$):** Engineers often use **Mass Velocity** ($G$) instead of linear velocity ($v$), especially for compressible fluids.
    $$G = \frac{\dot{m}}{A_{flow}} = v \times \rho$$
    Where $\dot{m}$ is the mass flow rate ($\text{kg}/\text{s}$) and $\rho$ is the fluid density ($\text{kg}/\text{m}^3$).
*   **Chevron Angle Impact:** While the chevron angle ($\beta$) does not directly affect the *average* velocity calculation as defined above, it profoundly affects the **local velocity** distribution, turbulence, and the resulting pressure drop and heat transfer coefficient. Plates with larger angles (e.g., $60^\circ$) induce higher turbulence and heat transfer but also higher pressure drop for the same average velocity, compared to plates with smaller angles (e.g., $30^\circ$).

This guide provides the core steps for calculating the average fluid velocity in a PHE. For a complete thermal design, this velocity is then used to calculate the Reynolds number, friction factor, and ultimately the heat transfer coefficient and pressure drop.
