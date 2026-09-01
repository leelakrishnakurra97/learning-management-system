// Auto-generated curriculum data for Classes 10, 11, 12
// Source: generate_10th_notes.py, curriculum_data_11.py, curriculum_data_12.py

export interface ChapterContent {
  title: string;
  definitions: [string, string][];
  formulas: string[];
  examples: { q: string; ans: string }[];
  hots: { q: string; ans: string }[];
  worksheet: string[];
  applications: [string, string][];
}

// ==================== CLASS 10 ====================

export const maths10Data: Record<number, ChapterContent> = {
  1:
  {
    title: `Relations and Functions`,
    definitions: [
      [`Cartesian Product`, `For non-empty sets A and B, A x B is the set of all ordered pairs (a, b) such that a belongs to A and b belongs to B.`],
      [`Relation`, `A relation R from A to B is a subset of the Cartesian Product A x B, satisfying specific conditions.`],
      [`Function`, `A relation f from A to B is a function if for each element a in A, there exists a unique element b in B such that (a, b) belongs to f.`],
      [`Domain and Range`, `For f: A -> B, A is the domain, B is the co-domain, and the set of all image values is the range of f.`],
    ],
    formulas: [
      `Number of elements: n(A x B) = n(A) * n(B)`,
      `Identity Function: f(x) = x for all x in A`,
      `Constant Function: f(x) = c (a constant) for all x in A`,
      `Linear Function: f(x) = mx + c where m is not zero`,
      `Composition of Functions: (f o g)(x) = f(g(x))`,
    ],
    examples: [
      { q: `If A = {1, 3, 5} and B = {2, 3}, find A x B and B x A.`, ans: `A x B = {(1, 2), (1, 3), (3, 2), (3, 3), (5, 2), (5, 3)}.\nB x A = {(2, 1), (2, 3), (2, 5), (3, 1), (3, 3), (3, 5)}.\nNote: A x B is not equal to B x A since the ordered pairs differ.` },
      { q: `Given f(x) = 2x + 1 and g(x) = x^2 - 2, find (f o g)(x).`, ans: `(f o g)(x) = f(g(x)) = f(x^2 - 2).\nSubstitute (x^2 - 2) in f: 2(x^2 - 2) + 1 = 2x^2 - 4 + 1 = 2x^2 - 3.` },
    ],
    hots: [
      { q: `Let A = {1, 2, 3, 4} and B = {5, 6, 7}. Can a relation R = {(1, 5), (2, 6), (3, 7), (1, 6)} be a function? Justify.`, ans: `No. In a function, each element in the domain must map to a unique element in the co-domain.\nHere, the element 1 in domain A maps to two different images, 5 and 6 in co-domain B. Thus, R is not a function.` },
    ],
    worksheet: [
      `Find n(A x B) if n(A) = 5 and n(B) = 3.`,
      `Determine if the relation R = {(1,2), (2,3), (3,4)} on A = {1,2,3,4} is a function.`,
      `If f(x) = 3x - 2, find f(2) and f(-1).`,
      `If g(x) = x + 3 and h(x) = 2x, show that composition is associative: g o (h o f) = (g o h) o f.`,
      `A function is defined by f(x) = x^2 - x. Solve f(x) = 6.`,
    ],
    applications: [
      [`Database Query Mapping`, `Cartesian products form the basis of SQL JOIN operations in databases, matching records of one table with another.`],
      [`Control Engineering`, `Functions model inputs and outputs in feedback control systems, predicting system stability based on mathematical transfers.`],
    ],
  },
  2:
  {
    title: `Numbers and Sequences`,
    definitions: [
      [`Euclid Division Lemma`, `For any positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 <= r < b.`],
      [`Modular Arithmetic`, `Two integers a and b are congruent modulo n if their difference (a - b) is divisible by n, written a = b (mod n).`],
      [`Arithmetic Progression (AP)`, `A sequence in which each term is obtained by adding a fixed number d to the preceding term, except the first term.`],
      [`Geometric Progression (GP)`, `A sequence in which each term is obtained by multiplying the preceding term by a fixed non-zero constant r.`],
    ],
    formulas: [
      `General term of an AP: tn = a + (n - 1)d`,
      `Sum of first n terms of an AP: Sn = (n/2)[2a + (n - 1)d] or Sn = (n/2)[a + l]`,
      `General term of a GP: tn = a * r^(n - 1)`,
      `Sum of first n terms of a GP: Sn = a(r^n - 1)/(r - 1) for r > 1, or a(1 - r^n)/(1 - r) for r < 1`,
      `Sum of infinite terms of GP: S_inf = a / (1 - r) where |r| < 1`,
    ],
    examples: [
      { q: `Find the 15th term of the AP: 3, 7, 11, 15, ...`, ans: `Here, first term a = 3 and common difference d = 7 - 3 = 4.\nApply formula: t15 = a + 14d = 3 + 14(4) = 3 + 56 = 59.` },
      { q: `Solve 8x = 4 (mod 6) for positive integers.`, ans: `8x - 4 = 6k for some integer k.\n4x - 2 = 3k => 4x = 3k + 2.\nFor k = 2, 4x = 8 => x = 2.\nFor k = 6, 4x = 20 => x = 5.\nGeneral solutions are x = 2, 5, 8, ... (congruent to 2 mod 3).` },
    ],
    hots: [
      { q: `The sum of three consecutive terms of an AP is 27 and their product is 288. Find the terms.`, ans: `Let the three consecutive terms be (a - d), a, (a + d).\nSum = 3a = 27 => a = 9.\nProduct = (9 - d)(9)(9 + d) = 288 => 81 - d^2 = 32 => d^2 = 49 => d = +7 or -7.\nIf d = 7, the terms are 2, 9, 16. If d = -7, the terms are 16, 9, 2.` },
    ],
    worksheet: [
      `Find the HCF of 84 and 105 using Euclid's Division Algorithm.`,
      `Determine the number of terms in the AP: 7, 13, 19, ..., 205.`,
      `Find the 10th term of a GP whose first term is 5 and common ratio is 2.`,
      `Evaluate the sum: 1 + 2 + 3 + ... + 100.`,
      `Solve the modular equation: x = 5 (mod 7) for values under 30.`,
    ],
    applications: [
      [`Cryptography`, `Modular arithmetic is the mathematical core of RSA encryption, securing internet traffic and bank transactions.`],
      [`Acoustic Scales`, `Equal temperament tuning of musical instruments uses a geometric progression of frequencies scaled by 2^(1/12).`],
    ],
  },
  3:
  {
    title: `Algebra`,
    definitions: [
      [`Linear Equation`, `An algebraic equation of first degree, which forms a straight line when plotted on a graph.`],
      [`GCD of Polynomials`, `The Greatest Common Divisor of two or more polynomials is the polynomial of highest degree that divides each without remainder.`],
      [`Quadratic Equation`, `A second-degree polynomial equation of the form ax^2 + bx + c = 0, where a is not zero.`],
      [`Matrix`, `A rectangular array of numbers or expressions arranged in horizontal rows and vertical columns.`],
    ],
    formulas: [
      `Quadratic Formula: x = [-b +- sqrt(b^2 - 4ac)] / 2a`,
      `Discriminant: Delta = b^2 - 4ac`,
      `Nature of Roots: Delta > 0 (Real & Unequal), Delta = 0 (Real & Equal), Delta < 0 (No Real Roots)`,
      `Sum of Roots: alpha + beta = -b/a  |  Product of Roots: alpha * beta = c/a`,
      `Matrix Multiplication: Row-by-Column dot product`,
    ],
    examples: [
      { q: `Solve the quadratic equation x^2 - 5x + 6 = 0.`, ans: `Factorise the equation: (x - 2)(x - 3) = 0.\nThis gives two roots: x = 2 and x = 3.\nAlternatively, using formula: a=1, b=-5, c=6. Discriminant = 25 - 24 = 1.\nRoots = (5 +- 1)/2 => x = 3 or x = 2.` },
      { q: `If A = [[1, 2], [3, 4]] and B = [[2, 0], [1, 2]], find AB.`, ans: `Row 1 x Col 1: 1*2 + 2*1 = 4. Row 1 x Col 2: 1*0 + 2*2 = 4.\nRow 2 x Col 1: 3*2 + 4*1 = 10. Row 2 x Col 2: 3*0 + 4*2 = 8.\nResult AB = [[4, 4], [10, 8]].` },
    ],
    hots: [
      { q: `Find the values of k for which the quadratic equation kx^2 - 10x + 5 = 0 has real and equal roots.`, ans: `For real and equal roots, the discriminant Delta must be zero.\nDelta = b^2 - 4ac = (-10)^2 - 4(k)(5) = 0.\n100 - 20k = 0 => 20k = 100 => k = 5.` },
    ],
    worksheet: [
      `Find the GCD of polynomials x^3 - x^2 and x^2 - x.`,
      `Determine the nature of roots for 2x^2 - 3x + 4 = 0.`,
      `If matrix A has order 3x2 and B has order 2x4, find the order of AB.`,
      `Factorise the quadratic expression: 2x^2 + 7x + 6.`,
      `Solve the system: x + y = 5, 2x - y = 4.`,
    ],
    applications: [
      [`Image Processing`, `Digital images are represented as massive matrices of pixel values; filters apply matrix transformations to edit color.`],
      [`Aerodynamics`, `Quadratic equations model projectile trajectory paths of rockets and ballistics, calculating maximum heights.`],
    ],
  },
  4:
  {
    title: `Geometry`,
    definitions: [
      [`Similar Triangles`, `Triangles having the same shape but not necessarily the same size. Corresponding angles are equal and sides are proportional.`],
      [`Thales Theorem`, `If a line is drawn parallel to one side of a triangle to intersect the other two sides, it divides them in the same ratio.`],
      [`Tangent to Circle`, `A straight line that touches the circle at exactly one point, perpendicular to the radius at that contact point.`],
      [`Cyclic Quadrilateral`, `A quadrilateral whose all four vertices lie on the circumference of a single circle.`],
    ],
    formulas: [
      `Basic Proportionality Theorem (BPT): AD / DB = AE / EC`,
      `Angle Bisector Theorem: BD / DC = AB / AC`,
      `Alternate Segment Theorem: Angle between chord and tangent equals angle in alternate segment`,
      `Intersecting Chords Rule: PA * PB = PC * PD`,
    ],
    examples: [
      { q: `In a triangle ABC, D and E are points on AB and AC such that DE || BC. If AD=2cm, DB=3cm, and AE=4cm, find EC.`, ans: `By Thales (BPT) theorem: AD / DB = AE / EC.\nSubstitute values: 2 / 3 = 4 / EC.\nCross multiply: 2 * EC = 12 => EC = 6 cm.` },
    ],
    hots: [
      { q: `State and prove the Angle Bisector Theorem (ABT).`, ans: `ABT states that the internal bisector of an angle of a triangle divides the opposite side internally in the ratio of the corresponding sides containing the angle.\nConstruction: Draw CE parallel to AB meeting AD produced at E.\nProof utilizes similar triangles ABD and ECD to derive BD / DC = AB / AC.` },
    ],
    worksheet: [
      `State Thales Theorem (Basic Proportionality Theorem).`,
      `In a circle of radius 5 cm, find the length of tangent from a point 13 cm away from the center.`,
      `Show that corresponding altitudes of similar triangles are proportional to their bases.`,
      `State the Alternate Segment Theorem.`,
      `A cyclic quadrilateral ABCD has angle A = 75 degrees. Find angle C.`,
    ],
    applications: [
      [`Navigation`, `Similarity principles allow cartographers to draw scaled maps representing actual terrains with accurate geometry.`],
      [`Bridge Truss Analysis`, `Triangulation models determine structural load distributions and load thresholds for safe civil constructions.`],
    ],
  },
  5:
  {
    title: `Coordinate Geometry`,
    definitions: [
      [`Cartesian Coordinates`, `A coordinate system specifying each point uniquely in a plane by a set of numerical coordinates (x, y).`],
      [`Collinear Points`, `Three or more points that lie on the same straight line, yielding a triangle area of zero.`],
      [`Slope of Line`, `A measure of the steepness of a line relative to the horizontal axis, calculated as rise over run.`],
      [`Centroid`, `The point of intersection of the three medians of a triangle, dividing each median in a 2:1 ratio.`],
    ],
    formulas: [
      `Distance Formula: d = sqrt((x2 - x1)^2 + (y2 - y1)^2)`,
      `Area of Triangle: A = 0.5 * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|`,
      `Slope of a Line (m): m = tan(theta) or m = (y2 - y1)/(x2 - x1)`,
      `Slope-Intercept form: y = mx + c  |  Point-Slope form: y - y1 = m(x - x1)`,
      `Condition for Parallel lines: m1 = m2  |  Perpendicular lines: m1 * m2 = -1`,
    ],
    examples: [
      { q: `Find the slope of a line passing through points A(5, 2) and B(3, 6).`, ans: `Apply slope formula: m = (y2 - y1) / (x2 - x1).\nHere, m = (6 - 2) / (3 - 5) = 4 / (-2) = -2.\nThe negative sign indicates the line slopes downwards to the right.` },
    ],
    hots: [
      { q: `Find the equation of a line passing through (2, 5) and perpendicular to the line joining (0, 0) and (4, 2).`, ans: `Slope of first line: m1 = (2 - 0) / (4 - 0) = 2/4 = 0.5.\nPerpendicular slope: m2 = -1 / m1 = -2.\nEquation using point-slope form with (2, 5): y - 5 = -2(x - 2) => y - 5 = -2x + 4 => 2x + y - 9 = 0.` },
    ],
    worksheet: [
      `Find the centroid of a triangle with vertices (2, -4), (-3, 6), and (7, 10).`,
      `Check if points A(1, 2), B(2, 3), and C(3, 4) are collinear.`,
      `Write the equation of the line passing through (1, 1) with slope 3.`,
      `Find the slope of a line perpendicular to y = 4x - 10.`,
      `Evaluate the area of a triangle whose vertices are (0,0), (4,0), and (0,3).`,
    ],
    applications: [
      [`GPS Mapping Systems`, `Global Positioning Systems (GPS) utilize cartesian coordinate lines to locate addresses and plan shortest path routes.`],
      [`Game Physics`, `Collision vectors and player motion paths are calculated continuously in 2D coordinate space using line slopes.`],
    ],
  },
  6:
  {
    title: `Trigonometry`,
    definitions: [
      [`Trigonometric Ratios`, `Ratios of side lengths of a right-angled triangle, representing angles relative to circular projections.`],
      [`Trigonometric Identities`, `Equations involving trigonometric functions that are true for all values of the occurring variables.`],
      [`Angle of Elevation`, `The angle formed by the line of sight and the horizontal plane for an object above the observer's eye level.`],
      [`Angle of Depression`, `The angle formed by the line of sight and the horizontal plane for an object below the observer's eye level.`],
    ],
    formulas: [
      `Fundamental Identity 1: sin^2(x) + cos^2(x) = 1`,
      `Fundamental Identity 2: 1 + tan^2(x) = sec^2(x)`,
      `Fundamental Identity 3: 1 + cot^2(x) = cosec^2(x)`,
      `Complementary Ratios: sin(90 - x) = cos(x)  |  tan(90 - x) = cot(x)`,
      `Ratios values: sin(30)=0.5, sin(45)=1/sqrt(2), sin(60)=sqrt(3)/2`,
    ],
    examples: [
      { q: `Prove that [sin(x) / (1 + cos(x))] + [(1 + cos(x)) / sin(x)] = 2 cosec(x).`, ans: `Cross-multiplying LHS: [sin^2(x) + (1 + cos(x))^2] / [sin(x)(1 + cos(x))].\nExpand: [sin^2(x) + 1 + 2cos(x) + cos^2(x)] / [sin(x)(1 + cos(x))].\nSince sin^2(x)+cos^2(x)=1, we get: [2 + 2cos(x)] / [sin(x)(1+cos(x))] = 2(1+cos(x)) / [sin(x)(1+cos(x))] = 2 / sin(x) = 2 cosec(x). Proved.` },
    ],
    hots: [
      { q: `A tower stands vertically on the ground. From a point 30m away from its foot, the angle of elevation of its top is 30 degrees. Find the height of the tower.`, ans: `Let height be h. We have adjacent side = 30m, and angle = 30 degrees.\nUsing tan ratio: tan(30) = opposite / adjacent = h / 30.\nSince tan(30) = 1/sqrt(3), we get: 1/sqrt(3) = h / 30 => h = 30 / sqrt(3) = 10 * sqrt(3) meters (approx 17.32 m).` },
    ],
    worksheet: [
      `Evaluate: sin(30) * cos(60) + cos(30) * sin(60).`,
      `Prove that: sec(x) * (1 - sin(x)) * (sec(x) + tan(x)) = 1.`,
      `If tan(A) = 3/4, find sin(A) and cos(A).`,
      `From the top of a 50m building, the angle of depression of a car is 45 degrees. Find the distance of the car from the building base.`,
      `Show that cos(90 - A) / sin(90 - A) = tan(A) is FALSE.`,
    ],
    applications: [
      [`Structural Surveying`, `Civil engineers use theodolites to measure angles of elevation, calculating tower and bridge heights easily.`],
      [`Satellite Telecommunications`, `Angles of orbit tracking are mapped using trigonometric functions to ensure perfect transmission pathways.`],
    ],
  },
  7:
  {
    title: `Mensuration`,
    definitions: [
      [`Surface Area`, `The total area of the outer faces of a three-dimensional solid, split into lateral (LSA) and total (TSA) areas.`],
      [`Volume`, `The amount of space occupied by a three-dimensional object, measured in cubic units.`],
      [`Cylinder`, `A solid geometrical figure with straight parallel sides and a circular cross-section.`],
      [`Frustum of Cone`, `The portion of a cone that lies between the base and a plane parallel to the base cutting off the top.`],
    ],
    formulas: [
      `Cylinder: CSA = 2 * pi * r * h  |  TSA = 2 * pi * r * (r + h)`,
      `Cone: CSA = pi * r * l  |  TSA = pi * r * (r + l) where slant height l = sqrt(r^2 + h^2)`,
      `Sphere: Surface Area = 4 * pi * r^2  |  Volume = (4/3) * pi * r^3`,
      `Hemisphere: CSA = 2 * pi * r^2  |  TSA = 3 * pi * r^2  |  Volume = (2/3) * pi * r^3`,
      `Frustum of Cone: Volume = (1/3) * pi * h * (R^2 + r^2 + R*r)`,
    ],
    examples: [
      { q: `Calculate the volume of a cylinder of radius 7 cm and height 10 cm. (Take pi = 22/7)`, ans: `Apply volume formula: V = pi * r^2 * h.\nV = (22/7) * 7 * 7 * 10 = 22 * 7 * 10 = 1540 cubic centimeters (cm³).` },
    ],
    hots: [
      { q: `A metallic sphere of radius 4.2 cm is melted and recast into the shape of a cylinder of radius 6 cm. Find the height of the cylinder.`, ans: `Volume of sphere = Volume of cylinder.\n(4/3) * pi * r_s^3 = pi * r_c^2 * h.\n(4/3) * (4.2)^3 = 6^2 * h => (4/3) * 74.088 = 36 * h => 98.784 = 36h => h = 2.744 cm.` },
    ],
    worksheet: [
      `Find the slant height of a cone of radius 6 cm and height 8 cm.`,
      `Determine the surface area of a sphere of radius 14 cm.`,
      `Find the TSA of a solid hemisphere of radius 7 cm.`,
      `A bucket in the shape of a frustum has radii 20 cm and 8 cm and height 16 cm. Find its volume.`,
      `How many spherical lead shots of radius 2cm can be made from a solid cuboid of dimensions 22cm x 18cm x 16cm?`,
    ],
    applications: [
      [`Industrial Container Design`, `Mensuration formulas calculate volume capacities of chemical containers, fuel tankers, and shipping crates.`],
      [`Material Recasting`, `Metal foundries utilize volume conservation rules to melt bulk ores and recast them into engine components.`],
    ],
  },
  8:
  {
    title: `Statistics and Probability`,
    definitions: [
      [`Standard Deviation`, `The square root of the arithmetic mean of the squares of deviations of values from their arithmetic mean.`],
      [`Coefficient of Variation (CV)`, `A relative measure of dispersion, expressed as percentage of standard deviation to mean.`],
      [`Addition Theorem`, `For any two events A and B in a sample space, the probability of union is P(A U B) = P(A) + P(B) - P(A n B).`],
      [`Mutually Exclusive Events`, `Events that cannot occur simultaneously, meaning their intersection is an empty set with zero probability.`],
    ],
    formulas: [
      `Range = Largest value (L) - Smallest value (S)`,
      `Standard Deviation (Ungrouped): sigma = sqrt( (sum(x - mean)^2) / n )`,
      `Coefficient of Variation: CV = (sigma / mean) * 100 %`,
      `Classical Probability: P(E) = n(E) / n(S)`,
      `Sure Event Probability: P(S) = 1  |  Impossible Event: P(empty) = 0`,
    ],
    examples: [
      { q: `A card is drawn from a pack of 52 cards. Find the probability of getting a red king.`, ans: `Total cards n(S) = 52. Red kings in a deck are two (King of Hearts and King of Diamonds).\nn(E) = 2.\nProbability P(E) = n(E) / n(S) = 2 / 52 = 1 / 26.` },
    ],
    hots: [
      { q: `If three coins are tossed simultaneously, find the probability of getting at least two heads.`, ans: `Sample space S = {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}. n(S) = 8.\nEvent E (at least 2 heads) = {HHH, HHT, HTH, THH}. n(E) = 4.\nProbability P(E) = n(E)/n(S) = 4/8 = 0.5.` },
    ],
    worksheet: [
      `Find the range of the data set: 25, 67, 48, 53, 18, 39, 44.`,
      `If the variance of a data set is 64, find its standard deviation.`,
      `If P(A) = 0.5, P(B) = 0.6, and P(A n B) = 0.2, find P(A U B).`,
      `Find the probability of getting a prime number when a fair die is rolled.`,
      `The mean of a data is 25 and its standard deviation is 5. Find the coefficient of variation.`,
    ],
    applications: [
      [`Stock Market Analytics`, `Standard deviation measures asset volatility, helping investors evaluate risk models in stock portfolios.`],
      [`Insurance Risk Modeling`, `Actuarial departments use probability distributions to calculate life expectancy and premium policy costs.`],
    ],
  },
};

export const science10Data: Record<number, ChapterContent> = {
  1:
  {
    title: `Physics`,
    definitions: [
      [`Inertia`, `The inherent property of a body to resist any change in its state of rest or state of uniform motion, unless acted upon by an external force.`],
      [`Impulse`, `A large force acting for a very short duration, measured as the product of the force and the time interval, equal to change in momentum.`],
      [`Power of Lens`, `The degree of convergence or divergence of light rays achieved by a lens, calculated as the reciprocal of its focal length in meters.`],
      [`Ohm Law`, `At constant temperature, the steady current flowing through a conductor is directly proportional to the potential difference across its ends.`],
    ],
    formulas: [
      `Force: F = m * a  |  Linear Momentum: p = m * v`,
      `Lens Formula: 1/f = 1/v - 1/u  |  Power: P = 1 / f (in diopters)`,
      `Ohm's Equation: V = I * R  |  Joule Heat: H = I^2 * R * t`,
      `Resistance (Series): Rs = R1 + R2 + R3`,
      `Resistance (Parallel): 1/Rp = 1/R1 + 1/R2 + 1/R3`,
    ],
    examples: [
      { q: `Calculate the equivalent resistance of three resistors of 2 ohms, 3 ohms, and 6 ohms connected in parallel.`, ans: `Apply parallel resistance formula: 1/Rp = 1/2 + 1/3 + 1/6.\nFind common denominator (6): 1/Rp = (3 + 2 + 1) / 6 = 6 / 6 = 1.\nTherefore, equivalent resistance Rp = 1 ohm.` },
    ],
    hots: [
      { q: `An object is placed at a distance of 20cm in front of a convex lens of focal length 10cm. Find the position and nature of the image.`, ans: `Here, object distance u = -20 cm, focal length f = +10 cm.\nLens formula: 1/v - 1/u = 1/f => 1/v - 1/(-20) = 1/10 => 1/v + 1/20 = 1/10.\n1/v = 1/10 - 1/20 = 1/20 => v = +20 cm.\nThe image is formed at 20cm on the other side of the lens. It is real and inverted, and same size since u = 2f.` },
    ],
    worksheet: [
      `State Newton's Second Law of Motion.`,
      `Define refractive index of a medium.`,
      `Write the equations representing Boyle's Law and Charles's Law.`,
      `A current of 2A flows through a resistor of 5 ohms for 10 seconds. Find the heat generated.`,
      `Explain the causes of myopia (short-sightedness) and how it is corrected.`,
    ],
    applications: [
      [`Home Wiring Systems`, `Household appliances are wired in parallel circuits to ensure each device receives standard 220V voltage input.`],
      [`Optical Diagnostics`, `Ophthalmic centers use lens power formulas to manufacture prescription eyeglasses correcting myopia.`],
    ],
  },
  2:
  {
    title: `Chemistry`,
    definitions: [
      [`Relative Atomic Mass`, `The ratio of the average mass of the isotopes of an element to 1/12th of the mass of a carbon-12 atom.`],
      [`Atomicity`, `The number of atoms present in one molecule of an element, classifying them as monoatomic, diatomic, etc.`],
      [`Solubility`, `The maximum mass of solute in grams that can be dissolved in 100g of solvent at a specific temperature.`],
      [`pH Scale`, `A logarithmic scale measuring hydrogen ion concentration to classify solutions as acidic, basic, or neutral.`],
    ],
    formulas: [
      `Number of moles: Moles = Mass of substance / Gram molecular mass`,
      `Solubility formula: Solubility = (Mass of solute / Mass of solvent) * 100`,
      `pH definition: pH = -log10[H+]`,
      `Avogadro Number: N_A = 6.023 * 10^23 particles per mole`,
    ],
    examples: [
      { q: `Find the number of moles in 36 grams of water (H2O).`, ans: `Molecular mass of H2O = 2(1) + 16 = 18 g/mol.\nApply formula: Moles = Given Mass / Molar Mass = 36 / 18 = 2 moles.` },
    ],
    hots: [
      { q: `Calculate the pH of a 0.001 M solution of Nitric Acid (HNO3).`, ans: `Nitric acid dissociates completely: HNO3 -> H+ + NO3-.\nTherefore, [H+] = 0.001 M = 10^-3 M.\nApply pH formula: pH = -log10[H+] = -log10(10^-3) = 3.\nSince pH < 7, the solution is strongly acidic.` },
    ],
    worksheet: [
      `State Avogadro's Hypothesis.`,
      `Find the mass of 0.5 moles of Carbon Dioxide (CO2).`,
      `Differentiate between concentrated and dilute solutions.`,
      `Explain the extraction of aluminium from bauxite ore using Hall-Heroult metallurgy.`,
      `Write the IUPAC nomenclature rules for naming simple organic compounds with alcohol functional group.`,
    ],
    applications: [
      [`Metallurgical Refining`, `Electrolytic reduction processes isolate structural metals like aluminium, used to manufacture aircraft parts.`],
      [`Water Quality Control`, `Municipal treatment plants monitor water pH levels to ensure municipal supplies remain neutral and non-corrosive.`],
    ],
  },
  3:
  {
    title: `Biology`,
    definitions: [
      [`Photosynthesis`, `The process by which green plants utilize sunlight, carbon dioxide, and water to synthesize glucose and release oxygen.`],
      [`Double Circulation`, `A circulation system where blood flows through the heart twice in one complete cycle of body circulation.`],
      [`Hormone`, `Chemical messengers secreted directly into the bloodstream by endocrine glands to regulate physiological functions.`],
      [`Heredity`, `The transmission of genetic characters from parents to offspring through DNA replication and chromosomal inheritances.`],
    ],
    formulas: [
      `Photosynthesis reaction: 6CO2 + 6H2O + Light -> C6H12O6 + 6O2`,
      `Cardiac Output: Cardiac Output = Stroke Volume * Heart Rate`,
      `Mendel Monohybrid Phenotypic Ratio: 3 : 1  |  Genotypic Ratio: 1 : 2 : 1`,
    ],
    examples: [
      { q: `If a person's stroke volume is 70 ml and heart rate is 72 beats per minute, calculate their cardiac output.`, ans: `Apply formula: Cardiac Output = Stroke Volume * Heart Rate.\nCardiac Output = 70 * 72 = 5040 ml per minute, which is approx 5.04 liters/min.` },
    ],
    hots: [
      { q: `Explain why pea plants were chosen by Gregor Mendel for his genetic hybridization experiments.`, ans: `Mendel selected garden peas (Pisum sativum) due to: (1) short life cycle, (2) presence of clear contrasting characters, (3) easy cross-pollination artificially, (4) hermaphrodite flowers facilitating natural self-pollination.` },
    ],
    worksheet: [
      `Describe the structure of human heart with a labelled schematic representation.`,
      `What is a reflex arc? List its components.`,
      `Explain the functions of the plant hormone Auxin.`,
      `Describe the structure of DNA double helix as proposed by Watson and Crick.`,
      `What are the main causes and preventive measures for Diabetes Mellitus?`,
    ],
    applications: [
      [`Agricultural Hormone Treatment`, `Auxin and Gibberellin sprays are utilized in commercial orchards to trigger seedless fruit development (parthenocarpy).`],
      [`Genetic Diagnostics`, `Understanding DNA structure allows labs to sequence chromosomes and screen for hereditary conditions.`],
    ],
  },
  4:
  {
    title: `Computer Science`,
    definitions: [
      [`Visual Communication`, `The transmission of information and ideas using structural visual aids like graphics, shapes, and images.`],
      [`Vector Graphics`, `Digital graphics defined by mathematical coordinate equations, permitting infinite scaling without loss of resolution.`],
      [`Raster Graphics`, `Digital images composed of grids of colored pixels, which become pixelated when enlarged.`],
      [`Scratch Programming`, `A block-based visual programming language designed to teach kids logical coding through dragging blocks.`],
    ],
    formulas: [
      `Resolution density: Pixels Per Inch (PPI)`,
      `Storage size of image: File Size = Width * Height * Bit Depth (in bits)`,
    ],
    examples: [
      { q: `Differentiate between Vector and Raster file formats.`, ans: `Vector formats (SVG, AI, PDF) use math lines, scaling infinitely without blur.\nRaster formats (JPEG, PNG, BMP) store pixel matrices, losing clarity when zoomed.` },
    ],
    hots: [
      { q: `Explain how coordinate math relates to vector sprite motion in block-based programming like Scratch.`, ans: `Scratch stage uses a Cartesian coordinate grid from X(-240 to 240) and Y(-180 to 180).\nMoving sprites invokes functions changing X and Y coordinate parameters directly.` },
    ],
    worksheet: [
      `Define visual communication.`,
      `Give two examples of vector and raster file extensions.`,
      `Explain how the Scratch 'forever' loop facilitates animation rendering.`,
      `Describe key features of image editing software.`,
      `Why do website developers prefer SVG vector files over PNG for logos?`,
    ],
    applications: [
      [`Web Design`, `Developers use vector SVG files for logos and icons to keep them crisp on high-density mobile screens.`],
      [`Interactive Prototyping`, `Block programming platforms teach structural computer science loops and logic patterns to primary students.`],
    ],
  },
};

// ==================== CLASS 11 ====================

export const maths11Data: Record<number, ChapterContent> = {
  1:
  {
    title: `Sets, Relations and Functions`,
    definitions: [
      [`Equivalence Relation`, `A relation R on a set A is equivalence if it is reflexive (aRa), symmetric (aRb => bRa), and transitive (aRb, bRc => aRc) for all a, b, c in A.`],
      [`Power Set`, `The set of all subsets of set A, denoted by P(A). The number of elements in P(A) is 2^n where n is the cardinality of A.`],
      [`Bijective Function`, `A function that is both injective (one-to-one) and surjective (onto), guaranteeing the existence of a unique inverse function.`],
    ],
    formulas: [
      `n(A U B U C) = n(A) + n(B) + n(C) - n(A n B) - n(B n C) - n(A n C) + n(A n B n C)`,
      `Composite Function: (g o f)(x) = g(f(x))`,
      `Inverse Function condition: f(f^-1(y)) = y and f^-1(f(x)) = x`,
    ],
    examples: [
      { q: `Show that the relation R on Z defined by aRb iff a-b is divisible by 5 is an equivalence relation.`, ans: `(1) Reflexive: a-a = 0 (divisible by 5). (2) Symmetric: If a-b = 5k, then b-a = -5k (divisible by 5). (3) Transitive: If a-b = 5k and b-c = 5m, then a-c = 5(k+m) (divisible by 5). Thus, R is equivalence.` },
    ],
    hots: [
      { q: `If f(x) = (x+1)/(x-1), show that f(f(x)) = x.`, ans: `f(f(x)) = f((x+1)/(x-1)) = [((x+1)/(x-1)) + 1] / [((x+1)/(x-1)) - 1] = (x+1+x-1) / (x+1-x+1) = 2x/2 = x.` },
    ],
    worksheet: [
      `Define equivalence class of an element.`,
      `If A and B have 3 and 4 elements, find the total number of relations from A to B.`,
      `Let f(x) = x^2. Find the domain and range of the function.`,
      `Find the inverse of f(x) = 3x - 5.`,
      `Prove that (A n B)' = A' U B' using set builder notation.`,
    ],
    applications: [
      [`Relational Algebra`, `Database query optimizations use set relations and projections to retrieve indexes efficiently.`],
      [`Functional Programming`, `Higher-order functions in software engineering directly model composition g(f(x)) of bijective functions.`],
    ],
  },
  2:
  {
    title: `Basic Algebra`,
    definitions: [
      [`Absolute Value`, `The non-negative value of a real number x without regard to its sign, denoted by |x|.`],
      [`Partial Fractions`, `The decomposition of a rational fraction into a sum of simpler fractions with polynomial denominators.`],
      [`Logarithm`, `The exponent to which another fixed value, the base, must be raised to produce a given number.`],
    ],
    formulas: [
      `log_a(xy) = log_a(x) + log_a(y)`,
      `log_a(x/y) = log_a(x) - log_a(y)`,
      `log_a(x^n) = n * log_a(x)`,
      `Change of base: log_b(a) = log_c(a) / log_c(b)`,
    ],
    examples: [
      { q: `Solve |2x - 3| < 5.`, ans: `-5 < 2x - 3 < 5.\nAdd 3: -2 < 2x < 8.\nDivide by 2: -1 < x < 4. The solution is x in (-1, 4).` },
    ],
    hots: [
      { q: `Resolve into partial fractions: (3x + 1) / ((x - 1)(x + 2)).`, ans: `Let (3x + 1)/((x-1)(x+2)) = A/(x-1) + B/(x+2).\n3x + 1 = A(x+2) + B(x-1).\nSet x=1 => 4 = 3A => A = 4/3. Set x=-2 => -5 = -3B => B = 5/3.\nPartial fraction is 4/(3(x-1)) + 5/(3(x+2)).` },
    ],
    worksheet: [
      `State the triangle inequality for real numbers.`,
      `Solve the quadratic inequality x^2 - 4x - 5 > 0.`,
      `Find the value of log_2(32).`,
      `Express log_10(15) in terms of log_10(3) and log_10(5).`,
      `Solve the equation: log_x(81) = 4.`,
    ],
    applications: [
      [`Information Theory`, `Entropy calculations in machine learning use log bases to determine information bits.`],
      [`Structural Engineering`, `Decomposing complex stress equations into partial fractions helps solve structural load integrations.`],
    ],
  },
  3:
  {
    title: `Trigonometry`,
    definitions: [
      [`Radian`, `The angle subtended at the center of a circle by an arc whose length is equal to the radius of the circle.`],
      [`Principal Value`, `The value of an inverse trigonometric function which lies in its standard restricted range.`],
      [`Periodicity`, `The property of a function f(x) where f(x+T) = f(x) for some non-zero constant T, representing repeating intervals.`],
    ],
    formulas: [
      `sin(A +- B) = sin(A)cos(B) +- cos(A)sin(B)`,
      `cos(A +- B) = cos(A)cos(B) -+ sin(A)sin(B)`,
      `Double Angle: sin(2A) = 2sin(A)cos(A) | cos(2A) = cos^2(A) - sin^2(A)`,
      `Sine Rule: a / sin(A) = b / sin(B) = c / sin(C) = 2R`,
    ],
    examples: [
      { q: `Find the value of sin(75 degrees).`, ans: `sin(75) = sin(45 + 30) = sin(45)cos(30) + cos(45)sin(30).\n= (1/sqrt(2))(sqrt(3)/2) + (1/sqrt(2))(1/2) = (sqrt(3) + 1) / (2*sqrt(2)).` },
    ],
    hots: [
      { q: `Prove that cos(A) + cos(B) + cos(C) = 1 + 4sin(A/2)sin(B/2)sin(C/2) in a triangle ABC.`, ans: `Use sum-to-product identities: cos(A) + cos(B) = 2cos((A+B)/2)cos((A-B)/2).\nSubstitute (A+B)/2 = 90 - C/2. Expand and factor out sin(C/2) to derive the relation.` },
    ],
    worksheet: [
      `Convert 135 degrees into radian measure.`,
      `Find the general solution of sin(theta) = -sqrt(3)/2.`,
      `State the values of cos(120 degrees) and tan(150 degrees).`,
      `Prove that sec^2(x) - tan^2(x) = 1.`,
      `In triangle ABC, if a=5, b=6, C=60, find the side c using Cosine rule.`,
    ],
    applications: [
      [`Civil Engineering`, `Surveyors use trigonometry to determine the height of bridges and roads by calculating angles of elevation.`],
      [`Digital Audio`, `Sound waves are modeled as sums of sine and cosine functions to compress MP3 files.`],
    ],
  },
  4:
  {
    title: `Combinatorics and Mathematical Induction`,
    definitions: [
      [`Permutation`, `An ordered arrangement of a set of objects, where the order of selection is highly significant.`],
      [`Combination`, `A selection of a set of objects without regard to order, focusing only on the grouping of items.`],
      [`Principle of Mathematical Induction`, `A proof technique where a statement is shown to hold for n=1, assumed for n=k, and proved for n=k+1.`],
    ],
    formulas: [
      `Permutations: nPr = n! / (n - r)!`,
      `Combinations: nCr = n! / (r! * (n - r)!)`,
      `Addition Principle: Total ways = m + n (for mutually exclusive events)`,
      `Multiplication Principle: Total ways = m * n (for successive events)`,
    ],
    examples: [
      { q: `Find the value of n if nP4 = 12 * nP2.`, ans: `nP4 = n(n-1)(n-2)(n-3) and nP2 = n(n-1).\nGiven: n(n-1)(n-2)(n-3) = 12 * n(n-1).\nFor n > 3: (n-2)(n-3) = 12 => n^2 - 5n + 6 = 12 => n^2 - 5n - 6 = 0 => (n-6)(n+1) = 0.\nSince n must be positive, n = 6.` },
    ],
    hots: [
      { q: `Prove by mathematical induction that 1^2 + 2^2 + ... + n^2 = n(n+1)(2n+1)/6.`, ans: `Base case n=1: LHS = 1, RHS = 1(2)(3)/6 = 1. Assume true for n=k: S_k = k(k+1)(2k+1)/6.\nFor n=k+1: S_(k+1) = S_k + (k+1)^2 = k(k+1)(2k+1)/6 + (k+1)^2.\nFactor out (k+1): (k+1)[k(2k+1)/6 + k+1] = ((k+1)/6)[2k^2 + 7k + 6] = (k+1)(k+2)(2k+3)/6. Proved.` },
    ],
    worksheet: [
      `Find the number of 4-letter words that can be formed using letters of 'PENCIL'.`,
      `Prove that nCr + nC(r-1) = (n+1)Cr.`,
      `If nC8 = nC2, find the value of nC21.`,
      `In how many ways can 5 people be seated around a circular table?`,
      `Use mathematical induction to prove that 7^n - 3^n is divisible by 4.`,
    ],
    applications: [
      [`Cryptography`, `Password complexities are evaluated using permutation formulas to determine vulnerability sizes.`],
      [`Logistics`, `Delivery routes are optimized using counting trees to find the shortest delivery paths.`],
    ],
  },
  5:
  {
    title: `Binomial Theorem, Sequences and Series`,
    definitions: [
      [`Binomial Expansion`, `An algebraic expansion of powers of a binomial (x + a)^n using combinations coefficients.`],
      [`Arithmetic Progression (AP)`, `A sequence where the difference between consecutive terms is a constant d.`],
      [`Geometric Progression (GP)`, `A sequence where the ratio of consecutive terms is a constant non-zero common ratio r.`],
    ],
    formulas: [
      `Binomial Theorem: (x+a)^n = sum_{r=0}^{n} nCr * x^(n-r) * a^r`,
      `General Term of AP: tn = a + (n-1)d | Sum: Sn = (n/2)[2a + (n-1)d]`,
      `General Term of GP: tn = a * r^(n-1) | Sum: Sn = a(r^n - 1)/(r-1)`,
      `Infinite GP Sum: S = a / (1 - r) for |r| < 1`,
    ],
    examples: [
      { q: `Find the middle term in the expansion of (x + 2/x)^8.`, ans: `Number of terms is 9, so middle term is t5.\nt5 = 8C4 * x^(8-4) * (2/x)^4 = 8C4 * x^4 * 16/x^4 = 70 * 16 = 1120.` },
    ],
    hots: [
      { q: `If the sum of a series is Sn = 2n^2 + 5n, find the 10th term and show the sequence is an AP.`, ans: `t_n = S_n - S_(n-1) = (2n^2 + 5n) - (2(n-1)^2 + 5(n-1)) = 4n + 3.\nCommon difference: t_n - t_(n-1) = (4n+3) - (4(n-1)+3) = 4 (constant, hence AP).\n10th term: t10 = 4(10) + 3 = 43.` },
    ],
    worksheet: [
      `Write the binomial expansion of (2x - 3y)^4.`,
      `Find the 15th term of the AP: 5, 8, 11, 14, ...`,
      `Find the sum of the infinite geometric series: 1 + 1/2 + 1/4 + 1/8 + ...`,
      `Define Arithmetic Mean (AM) and Geometric Mean (GM).`,
      `Insert three geometric means between 2 and 32.`,
    ],
    applications: [
      [`Financial Calculations`, `Compound interest values are derived using binomial series approximations for daily compounding rates.`],
      [`Acoustic Scales`, `Musical octaves are geometric progressions of frequencies, doubling pitch levels per octave.`],
    ],
  },
  6:
  {
    title: `Two Dimensional Analytical Geometry`,
    definitions: [
      [`Locus`, `The path traced by a moving point which satisfies given mathematical conditions.`],
      [`Slope`, `The tangent of the angle of inclination of a straight line, representing the steepness.`],
      [`Pair of Straight Lines`, `A second-degree homogeneous equation ax^2 + 2hxy + by^2 = 0 representing two lines passing through origin.`],
    ],
    formulas: [
      `Slope-Intercept: y = mx + c | Point-Slope: y - y1 = m(x - x1)`,
      `Distance from (x0, y0) to ax + by + c = 0: d = |ax0 + by0 + c| / sqrt(a^2 + b^2)`,
      `Angle between lines: tan(theta) = |(m1 - m2) / (1 + m1*m2)|`,
      `Angle (pair of lines): tan(theta) = 2*sqrt(h^2 - ab) / |a + b|`,
    ],
    examples: [
      { q: `Find the equation of a line passing through (1, -3) and perpendicular to 2x - 3y + 5 = 0.`, ans: `Slope of given line: m1 = 2/3.\nPerpendicular slope: m2 = -3/2.\nLine equation: y - (-3) = (-3/2)(x - 1) => 2(y + 3) = -3(x - 1) => 3x + 2y + 3 = 0.` },
    ],
    hots: [
      { q: `Show that the equation 2x^2 + 5xy + 2y^2 + 3x + 3y + 1 = 0 represents a pair of straight lines and find the angle between them.`, ans: `Check determinant condition abc + 2fgh - af^2 - bg^2 - ch^2 = 0.\nHere a=2, b=2, c=1, h=2.5, g=1.5, f=1.5. Determinant is zero, so it represents lines.\nAngle: tan(theta) = 2*sqrt(6.25 - 4) / |2 + 2| = 2*sqrt(2.25)/4 = 3/4.` },
    ],
    worksheet: [
      `Find the locus of a point which is equidistant from the points (2, 3) and (-1, 5).`,
      `Find the slope of a line passing through (4, -2) and (-1, 8).`,
      `Write the equation of the line whose intercepts are a=3, b=-2.`,
      `Determine the distance between the parallel lines 3x - 4y + 5 = 0 and 3x - 4y - 10 = 0.`,
      `State the condition for the lines ax + by + c = 0 and dx + ey + f = 0 to be parallel.`,
    ],
    applications: [
      [`Game Physics`, `Collision vectors and reflection lines on surfaces are mapped using line slope mathematics.`],
      [`Roadway Design`, `Highways curves are surveyed and mapped using analytical geometry locus equations.`],
    ],
  },
  7:
  {
    title: `Matrices and Determinants`,
    definitions: [
      [`Transpose of a Matrix`, `A matrix obtained by swapping the rows and columns of a given matrix A, denoted by A^T.`],
      [`Determinant`, `A scalar value calculated from a square matrix, representing scale factors of coordinate transformations.`],
      [`Skew-Symmetric Matrix`, `A square matrix A is skew-symmetric if A^T = -A, implying all main diagonal elements are zero.`],
    ],
    formulas: [
      `Matrix Transpose: (AB)^T = B^T * A^T`,
      `Determinant Properties: |A^T| = |A| and |AB| = |A| * |B|`,
      `Area of Triangle: A = 0.5 * |det([[x1, y1, 1], [x2, y2, 1], [x3, y3, 1]])|`,
    ],
    examples: [
      { q: `Evaluate the determinant of A = [[1, 2], [3, 4]].`, ans: `det(A) = 1*4 - 2*3 = 4 - 6 = -2.` },
    ],
    hots: [
      { q: `Without expanding, prove that det([[1, a, a^2], [1, b, b^2], [1, c, c^2]]) = (a-b)(b-c)(c-a).`, ans: `Apply row operations: R2 -> R2 - R1 and R3 -> R3 - R1.\ndet = det([[1, a, a^2], [0, b-a, b^2-a^2], [0, c-a, c^2-a^2]]).\nFactor out (b-a) from R2 and (c-a) from R3 to get (b-a)(c-a) * det([[1, a, a^2], [0, 1, b+a], [0, 1, c+a]]). Expand to get the result.` },
    ],
    worksheet: [
      `If A is a symmetric matrix, show that kA is also symmetric.`,
      `Find the values of x if det([[x, 2], [3, x]]) = 10.`,
      `Construct a 2x3 matrix whose elements are given by a_ij = i + 2j.`,
      `Calculate the area of the triangle with vertices (3, 8), (-4, 2), and (5, 1) using determinants.`,
      `Define singular and non-singular matrices.`,
    ],
    applications: [
      [`Cryptography`, `Matrix multiplication codes text files, while matrix division decodes them at destination sites.`],
      [`Structural Engineering`, `Stiffness matrices map loading reactions across complex skyscraper frames.`],
    ],
  },
  8:
  {
    title: `Vector Algebra`,
    definitions: [
      [`Unit Vector`, `A vector with a magnitude of exactly one, pointing in a specific directional orientation, denoted by a_hat.`],
      [`Scalar Product`, `The product of the magnitudes of two vectors and the cosine of the angle between them, yielding a scalar.`],
      [`Direction Cosines`, `The cosines of the angles made by a vector with the three positive coordinate axes (x, y, z).`],
    ],
    formulas: [
      `Dot Product: a . b = |a|*|b|*cos(theta)`,
      `Cross Product: a x b = |a|*|b|*sin(theta) * n_hat`,
      `Section Formula: r = (m*b + n*a) / (m + n)`,
    ],
    examples: [
      { q: `Find the angle between vectors a = 2i + j - k and b = i + j.`, ans: `a.b = 2(1) + 1(1) + (-1)(0) = 3.\n|a| = sqrt(4+1+1) = sqrt(6) | |b| = sqrt(1+1) = sqrt(2).\ncos(theta) = a.b / (|a||b|) = 3 / (sqrt(6)*sqrt(2)) = 3 / sqrt(12) = sqrt(3)/2 => theta = 30 degrees.` },
    ],
    hots: [
      { q: `Prove by vector method that the diagonals of a rhombus bisect each other at right angles.`, ans: `Let O be origin. Vector diagonals are d1 = a + b and d2 = a - b.\n rhombus condition: |a| = |b|.\nd1 . d2 = (a + b) . (a - b) = |a|^2 - |b|^2 = 0.\nSince the dot product is zero, the diagonals are perpendicular.` },
    ],
    worksheet: [
      `Find the unit vector along the vector a = 3i - 4j + 12k.`,
      `Find the projection of vector i - j on i + j.`,
      `Calculate the work done by force F = 2i + 3j - k in displacing a body from (1, 1) to (3, 4).`,
      `Determine the value of lambda for which vectors a = 2i + lambda*j + k and b = i - 2j + 3k are perpendicular.`,
      `Calculate the torque vector for force F = 3i + j - 2k acting at point r = i + j.`,
    ],
    applications: [
      [`Flight Dynamics`, `Airplanes use vector calculations to determine crosswind drift angles and adjust compass headings.`],
      [`Game Physics`, `Vectors calculate physics paths, light reflections, and bullet trajectories in game engines.`],
    ],
  },
  9:
  {
    title: `Differential Calculus - Limits and Continuity`,
    definitions: [
      [`Limit of a Function`, `The value that a function f(x) approaches as the input x approaches a specific target value.`],
      [`Continuity`, `A function f(x) is continuous at x = a if the limit of f(x) as x approaches a equals the actual function value f(a).`],
      [`One-Sided Limit`, `The value approached by a function as input x approaches a target value from either the left or the right.`],
    ],
    formulas: [
      `Trig Limit: lim_{x->0} (sin x / x) = 1`,
      `Exp Limit: lim_{x->0} (e^x - 1) / x = 1`,
      `Power Limit: lim_{x->a} (x^n - a^n) / (x - a) = n * a^(n-1)`,
    ],
    examples: [
      { q: `Evaluate the limit: lim_{x->3} (x^2 - 9) / (x - 3).`, ans: `Factor the numerator: (x - 3)(x + 3) / (x - 3) = x + 3.\nApply the limit: lim_{x->3} (x + 3) = 6.` },
    ],
    hots: [
      { q: `Show that the function f(x) = |x| / x is discontinuous at x = 0.`, ans: `Left Hand Limit (LHL): lim_{x->0-} |x|/x = -x/x = -1.\nRight Hand Limit (RHL): lim_{x->0+} |x|/x = x/x = 1.\nSince LHL is not equal to RHL, the limit does not exist, proving discontinuity.` },
    ],
    worksheet: [
      `Evaluate lim_{x->0} (sin(5x) / x).`,
      `Test the continuity of f(x) = 2x + 3 at x = 1.`,
      `Evaluate lim_{x->2} (x^3 - 8) / (x - 2).`,
      `State the intermediate value theorem.`,
      `Find the limit of (3x^2 + 5) / (2x^2 - x) as x approaches infinity.`,
    ],
    applications: [
      [`Financial Economics`, `Continuous compound interest values are calculated using exponential limits of compounding schedules.`],
      [`Fluid Dynamics`, `Flow velocities are calculated at boundaries using limit approximations of shear stress.`],
    ],
  },
  10:
  {
    title: `Differential Calculus - Differentiability`,
    definitions: [
      [`Derivative`, `The instantaneous rate of change of a function with respect to its independent variable, representing tangent slopes.`],
      [`Differentiability`, `The condition where a function possesses a defined derivative at a given point in its domain.`],
      [`Chain Rule`, `A formula for calculating the derivative of the composition of two or more functions.`],
    ],
    formulas: [
      `Product Rule: d/dx(uv) = u * v' + v * u'`,
      `Quotient Rule: d/dx(u/v) = (v * u' - u * v') / v^2`,
      `Derivatives: d/dx(sin x) = cos x | d/dx(e^x) = e^x | d/dx(ln x) = 1/x`,
    ],
    examples: [
      { q: `Differentiate y = x^2 * sin(x) with respect to x.`, ans: `Apply Product rule: dy/dx = x^2 * d/dx(sin x) + sin(x) * d/dx(x^2).\ndy/dx = x^2 * cos(x) + 2x * sin(x).` },
    ],
    hots: [
      { q: `Find dy/dx if y = x^x.`, ans: `Use logarithmic differentiation: ln(y) = x * ln(x).\nDifferentiate: (1/y) * dy/dx = x * (1/x) + ln(x) * 1 = 1 + ln(x).\nMultiply by y: dy/dx = x^x * (1 + ln(x)).` },
    ],
    worksheet: [
      `Find the derivative of f(x) = x^4 - 3x^2 + 5.`,
      `Differentiate y = cos(x^3) using the chain rule.`,
      `Find dy/dx for the implicit equation: x^2 + y^2 = 25.`,
      `Find the second derivative of y = e^(2x).`,
      `Differentiate parametric equations: x = a*cos(t), y = a*sin(t).`,
    ],
    applications: [
      [`Kinematics`, `Differentiating position with respect to time yields velocity, while differentiating velocity yields acceleration.`],
      [`Optimization`, `Designers find optimal curves by differentiating load formulas to find zero slope coordinates.`],
    ],
  },
  11:
  {
    title: `Integral Calculus`,
    definitions: [
      [`Indefinite Integral`, `The family of anti-derivatives of a function, containing an arbitrary integration constant C.`],
      [`Definite Integral`, `The numerical value representing the signed net area bounded by a curve over a specific domain interval.`],
      [`Integration by Parts`, `A mathematical technique based on the product rule of differentiation, used to integrate products of functions.`],
    ],
    formulas: [
      `Power Rule: Integral x^n dx = (x^(n+1) / (n+1)) + C for n != -1`,
      `Integration by Parts: Integral u dv = u*v - Integral v du`,
      `Standard Form: Integral (1 / (x^2 + a^2)) dx = (1/a) * tan^-1(x/a) + C`,
    ],
    examples: [
      { q: `Evaluate: Integral (3x^2 + 2x - 5) dx.`, ans: `Integrate term by term: 3(x^3/3) + 2(x^2/2) - 5x + C = x^3 + x^2 - 5x + C.` },
    ],
    hots: [
      { q: `Evaluate: Integral x * e^x dx.`, ans: `Use integration by parts: Let u = x, dv = e^x dx => du = dx, v = e^x.\nIntegral = x*e^x - Integral e^x dx = x*e^x - e^x + C = e^x * (x - 1) + C.` },
    ],
    worksheet: [
      `Find the integral of sin(3x) dx.`,
      `Evaluate definite integral of x^2 dx from limits 1 to 3.`,
      `Integrate: dx / (x + 2).`,
      `Evaluate: Integral x * cos(x) dx.`,
      `State the fundamental theorem of integral calculus.`,
    ],
    applications: [
      [`Acoustic Engineering`, `Integrals calculate total sound wave energy levels traversing resonant soundproofing walls.`],
      [`Structural Analytics`, `Definite integrals calculate structural centroids and center of mass values of bridge decks.`],
    ],
  },
  12:
  {
    title: `Introduction to Probability Theory`,
    definitions: [
      [`Conditional Probability`, `The probability of an event A occurring given that another event B has already occurred, denoted P(A|B).`],
      [`Independent Events`, `Two events are independent if the occurrence of one does not affect the probability of occurrence of the other.`],
      [`Sample Space`, `The set of all possible outcomes of a random probability experiment, denoted by S.`],
    ],
    formulas: [
      `Conditional Probability: P(A | B) = P(A n B) / P(B)`,
      `Addition Theorem: P(A U B) = P(A) + P(B) - P(A n B)`,
      `Bayes' Theorem: P(A_i | B) = [P(B | A_i) * P(A_i)] / sum[P(B | A_j) * P(A_j)]`,
    ],
    examples: [
      { q: `If P(A) = 0.6, P(B) = 0.5, and P(A n B) = 0.3, find P(A | B).`, ans: `Apply conditional probability: P(A | B) = P(A n B) / P(B) = 0.3 / 0.5 = 3/5 = 0.6.` },
    ],
    hots: [
      { q: `A bag contains 5 red and 3 blue balls. If two balls are drawn at random without replacement, find the probability that one is red and one is blue.`, ans: `Total balls = 8. (1) Red first, then Blue: (5/8) * (3/7) = 15/56.\n(2) Blue first, then Red: (3/8) * (5/7) = 15/56.\nTotal probability = 15/56 + 15/56 = 30/56 = 15/28.` },
    ],
    worksheet: [
      `If P(A) = 0.4 and P(B) = 0.5, and A and B are independent, find P(A n B).`,
      `Define mutually exclusive events.`,
      `Write down the sample space when three fair coins are tossed.`,
      `State total probability theorem.`,
      `Explain Bayes' Theorem formula and its components.`,
    ],
    applications: [
      [`Biostatistics`, `Bayes' theorem calculates diagnostic accuracy rates of clinical tests given false positive ratios.`],
      [`Asset Pricing`, `Probability distributions map investment volatility margins to construct diversified investment funds.`],
    ],
  },
};

export const physics11Data: Record<number, ChapterContent> = {
  1:
  {
    title: `Nature of Physical World and Measurement`,
    definitions: [
      [`Physical Quantity`, `A quantity that can be measured and in terms of which laws of physics can be described.`],
      [`Dimensional Formula`, `An algebraic expression showing which of the base quantities enter into the unit of a physical quantity.`],
      [`Least Count`, `The smallest value that can be measured accurately with a given measuring scale instrument.`],
    ],
    formulas: [
      `Dimensional Homogeneity: Dimensions of all terms in an equation must be identical.`,
      `Least Count (Vernier): LC = 1 MSD - 1 VSD`,
      `Least Count (Screw Gauge): LC = Pitch / Number of Head Scale Divisions`,
    ],
    examples: [
      { q: `Check the correctness of the equation v^2 = u^2 + 2as using dimensions.`, ans: `LHS: [v]^2 = [LT^-1]^2 = [L^2 T^-2].\nRHS: [u]^2 + [2as] = [LT^-1]^2 + [LT^-2][L] = [L^2 T^-2] + [L^2 T^-2] = [L^2 T^-2].\nSince LHS = RHS, the equation is dimensionally correct.` },
    ],
    hots: [
      { q: `If force (F), velocity (V), and time (T) are taken as fundamental units, find the dimensions of mass.`, ans: `[M] = [F^a V^b T^c] = [MLT^-2]^a [LT^-1]^b [T]^c = [M^a L^(a+b) T^(-2a-b+c)].\nComparing powers: a=1, a+b=0 => b=-1, -2a-b+c=0 => -2+1+c=0 => c=1.\nHence, Mass = [F V^-1 T].` },
    ],
    worksheet: [
      `Distinguish between fundamental and derived physical quantities.`,
      `What is a light year? State its value in meters.`,
      `Write down the dimensions of gravitational constant G.`,
      `Find the percentage error in density if mass error is 2% and volume error is 3%.`,
      `List the limitations of dimensional analysis.`,
    ],
    applications: [
      [`Aerospace Engineering`, `Precision scales down to micrometers calibrate turbine blade layouts using vernier scales.`],
      [`Structural Acoustics`, `Dimensional mappings determine resonance frequencies of complex building foundations.`],
    ],
  },
  2:
  {
    title: `Kinematics`,
    definitions: [
      [`Scalar and Vector`, `Scalars have magnitude only (e.g. speed); vectors have both magnitude and direction (e.g. velocity).`],
      [`Projectile`, `An object thrown into space upon which the only active force is gravity.`],
      [`Uniform Circular Motion`, `Motion of an object in a circle at a constant speed, undergoing continuous acceleration.`],
    ],
    formulas: [
      `Equations of Motion: v = u + at | s = ut + 0.5*a*t^2 | v^2 = u^2 + 2as`,
      `Projectile Range: R = (u^2 * sin(2*theta)) / g`,
      `Maximum Height: H = (u^2 * sin^2(theta)) / (2g)`,
      `Centripetal Acceleration: a_c = v^2 / r = omega^2 * r`,
    ],
    examples: [
      { q: `A ball is thrown with a velocity of 20 m/s at an angle of 30 degrees to the horizontal. Calculate the range of the projectile. (g = 10 m/s^2)`, ans: `Apply range formula: R = u^2 * sin(2*theta) / g.\nR = 20^2 * sin(60) / 10 = 400 * (sqrt(3)/2) / 10 = 20 * sqrt(3) = 34.64 meters.` },
    ],
    hots: [
      { q: `Prove that the path of a projectile is a parabola.`, ans: `Horizontal distance x = (u cos(theta))t => t = x / (u cos(theta)).\nVertical distance y = (u sin(theta))t - 0.5*g*t^2.\nSubstitute t: y = x*tan(theta) - [g / (2*u^2*cos^2(theta))] * x^2.\nThis is in form y = Ax - Bx^2, representing a parabola.` },
    ],
    worksheet: [
      `Define average speed and average velocity.`,
      `A particle moves in a circle of radius 2m with speed 4 m/s. Find centripetal acceleration.`,
      `Explain the difference between path length and displacement.`,
      `Calculate maximum height of a projectile thrown at 45 degrees with speed 10 m/s.`,
      `Define angular displacement and angular velocity.`,
    ],
    applications: [
      [`Ballistics`, `Missiles trajectories are calculated using range formulas to target coordinates precisely.`],
      [`Highway Curve Safety`, `Highway curves are banked to balance centripetal requirements with friction bounds.`],
    ],
  },
  3:
  {
    title: `Laws of Motion`,
    definitions: [
      [`Inertia`, `The inherent property of a body to resist any change in its state of rest or uniform motion.`],
      [`Impulse`, `A large force acting on a body for a short duration, measured as the product of force and time, equal to change in momentum.`],
      [`Coefficient of Friction`, `The ratio of the frictional force to the normal force acting between two contact surfaces.`],
    ],
    formulas: [
      `Newton's Second Law: F = dp/dt = m * a`,
      `Impulse: J = F * delta_t = delta_p`,
      `Static Friction: f_s <= mu_s * N | Kinetic: f_k = mu_k * N`,
      `Apparent Weight in Lift: R = m(g +- a)`,
    ],
    examples: [
      { q: `A body of mass 5 kg is acted on by a force of 20 N. Find its acceleration.`, ans: `Apply F = ma: a = F / m = 20 / 5 = 4 m/s^2.` },
    ],
    hots: [
      { q: `Why is it easier to pull a lawn mower than to push it?`, ans: `When pushing: vertical component of force acts downwards, increasing normal force N = mg + F sin(theta). Thus, friction f = mu * N increases.\nWhen pulling: vertical component of force acts upwards, reducing normal force N = mg - F sin(theta). Thus, friction decreases, making pulling easier.` },
    ],
    worksheet: [
      `State Newton's three laws of motion.`,
      `Explain the law of conservation of linear momentum with an example.`,
      `What is banking of roads? State its expression for speed limits.`,
      `A 10kg mass is in a lift moving down with a=2 m/s^2. Find tension in the cable.`,
      `Distinguish between static friction and kinetic friction.`,
    ],
    applications: [
      [`Automobile Engineering`, `Crumple zones are designed to increase collision time, reducing impact force on passengers.`],
      [`Athletics`, `Running tracks are designed with specific friction boundaries to optimize spikes traction.`],
    ],
  },
  4:
  {
    title: `Work, Energy and Power`,
    definitions: [
      [`Work Done`, `The product of the component of force along the direction of displacement and the magnitude of displacement.`],
      [`Conservative Force`, `A force where the work done in moving a particle between two points is independent of the path taken.`],
      [`Coefficient of Restitution`, `The ratio of relative velocity of separation to relative velocity of approach after a collision.`],
    ],
    formulas: [
      `Work: W = F . d = F * d * cos(theta)`,
      `Kinetic Energy: KE = 0.5 * m * v^2 | Potential: PE = m * g * h`,
      `Power: P = dW/dt = F . v`,
      `Coefficient of Restitution: e = (v2 - v1) / (u1 - u2)`,
    ],
    examples: [
      { q: `Calculate the work done in lifting a 10kg block to a height of 5m. (g = 9.8 m/s^2)`, ans: `W = F * d = m * g * h = 10 * 9.8 * 5 = 490 Joules.` },
    ],
    hots: [
      { q: `Show that for a perfectly elastic 1D collision, the relative velocity of approach equals relative velocity of separation.`, ans: `Conservation of momentum: m1*u1 + m2*u2 = m1*v1 + m2*v2.\nConservation of KE: 0.5*m1*u1^2 + 0.5*m2*u2^2 = 0.5*m1*v1^2 + 0.5*m2*v2^2.\nDividing the KE expression by momentum expression yields: u1 - u2 = v2 - v1.` },
    ],
    worksheet: [
      `State the work-energy theorem.`,
      `A 20W bulb is turned on for 10 seconds. Find the energy consumed.`,
      `Differentiate between elastic and inelastic collisions.`,
      `What is potential energy of a stretched spring? Write its expression.`,
      `Show that mechanical energy is conserved during free fall.`,
    ],
    applications: [
      [`Hydropower Plants`, `Gravitational potential energy of dammed water is converted to kinetic energy to rotate power turbines.`],
      [`Sports Technology`, `Golf balls are engineered with high coefficients of restitution to travel further upon impact.`],
    ],
  },
  5:
  {
    title: `Motion of System of Particles and Rigid Bodies`,
    definitions: [
      [`Center of Mass`, `The point where the entire mass of a system of particles can be assumed to be concentrated.`],
      [`Torque`, `The turning effect of a force about a point or axis of rotation, measured as force times distance.`],
      [`Radius of Gyration`, `The perpendicular distance from the axis of rotation to a point where the mass of the rigid body is concentrated.`],
    ],
    formulas: [
      `Center of Mass: X_cm = (m1*x1 + m2*x2) / (m1 + m2)`,
      `Torque: tau = r x F = I * alpha`,
      `Angular Momentum: L = r x p = I * omega`,
      `Parallel Axis Theorem: I = I_cm + M * d^2 | Perpendicular: Iz = Ix + Iy`,
    ],
    examples: [
      { q: `Two masses of 2kg and 3kg are placed at coordinates x=1m and x=4m. Find the center of mass coordinate.`, ans: `X_cm = (2*1 + 3*4) / (2 + 3) = (2 + 12) / 5 = 14 / 5 = 2.8 meters.` },
    ],
    hots: [
      { q: `State and prove the perpendicular axes theorem for planar laminar bodies.`, ans: `Theorem states Iz = Ix + Iy.\nProof: For any particle mass m at (x,y), Iz = sum[m * (x^2 + y^2)].\nIz = sum[m*x^2] + sum[m*y^2] = Iy + Ix, which matches definition of axes.` },
    ],
    worksheet: [
      `Define moment of inertia and state its SI unit.`,
      `Explain conservation of angular momentum with an example.`,
      `Write the parallel axis theorem expression.`,
      `Find the torque of force F = 2i + 3j acting at distance r = i - j.`,
      `Distinguish between center of mass and center of gravity.`,
    ],
    applications: [
      [`Aviation Dynamics`, `Helicopters balance rotor torque using tail rotors to maintain yaw stability.`],
      [`Gymnastics`, `Divers tuck their limbs in during jumps to reduce their moment of inertia, spinning faster.`],
    ],
  },
  6:
  {
    title: `Gravitation`,
    definitions: [
      [`Universal Law of Gravitation`, `The attractive force between two masses is proportional to the product of masses and inversely to distance squared.`],
      [`Escape Speed`, `The minimum speed required for a body to escape from the gravitational influence of a planet.`],
      [`Orbital Velocity`, `The speed at which a satellite moves around a planet in a stable orbit configuration.`],
    ],
    formulas: [
      `Force: F = G * m1 * m2 / r^2 (G = 6.67 * 10^-11 N m^2/kg^2)`,
      `Acceleration: g' = g * [R^2 / (R + h)^2] (altitude variation)`,
      `Escape Speed: v_e = sqrt(2 * g * R) | Orbital: v_o = sqrt(g * R)`,
    ],
    examples: [
      { q: `Find escape speed on Earth's surface if radius is 6400km and g = 9.8 m/s^2.`, ans: `v_e = sqrt(2 * 9.8 * 6.4*10^6) = sqrt(1.2544 * 10^8) = 11200 m/s = 11.2 km/s.` },
    ],
    hots: [
      { q: `Derive Kepler's Third Law (Law of Periods) for circular orbits.`, ans: `Centripetal force equals gravitational force: m*v^2/r = G*M*m/r^2 => v^2 = G*M/r.\nSince v = 2*pi*r / T: (4*pi^2*r^2)/T^2 = G*M/r => T^2 = (4*pi^2 / (G*M)) * r^3.\nHence, T^2 is directly proportional to r^3.` },
    ],
    worksheet: [
      `State Kepler's three laws of planetary motion.`,
      `How does acceleration due to gravity vary with depth below Earth's surface?`,
      `What are geostationary satellites? State their time period.`,
      `Calculate orbital speed of a satellite orbiting close to Earth's surface.`,
      `Explain weightlessness in space stations.`,
    ],
    applications: [
      [`Satellite Networks`, `GPS satellites are parked in circular orbits using orbital velocity bounds to sync trackers.`],
      [`Space Exploration`, `Planetary probes use gravity assist slingshots around planets to speed up without fuel.`],
    ],
  },
  7:
  {
    title: `Properties of Matter`,
    definitions: [
      [`Stress and Strain`, `Stress is internal restoring force per unit area; strain is fractional change in dimension under load.`],
      [`Surface Tension`, `The property of a liquid surface to act like a stretched elastic membrane, minimizing area.`],
      [`Viscosity`, `The internal friction force between fluid layers moving relative to each other.`],
    ],
    formulas: [
      `Hooke's Law: Stress = E * Strain | Young Modulus: Y = (F*L) / (A*delta_L)`,
      `Terminal Velocity (Stokes): v_t = (2/9) * r^2 * (rho_s - rho_f) * g / eta`,
      `Surface Tension: T = F / l = r * h * rho * g / (2 * cos(theta))`,
    ],
    examples: [
      { q: `Find terminal velocity of a steel ball of radius 1mm falling in glycerine (eta=0.83 kg/m-s, densities steel=7800, glycerine=1260 kg/m3).`, ans: `v_t = (2/9)*(10^-3)^2 * (7800-1260)*9.8 / 0.83 = (2/9)*10^-6 * 6540 * 9.8 / 0.83 = 0.017 m/s.` },
    ],
    hots: [
      { q: `State and prove Bernoulli's Theorem for streamline fluid flow.`, ans: `Theorem: P + 0.5*rho*v^2 + rho*g*h = Constant.\nProof: Work done per unit volume by pressure equals changes in KE and PE per unit volume.\nP1 - P2 = 0.5*rho*(v2^2 - v1^2) + rho*g*(h2 - h1), rearranges to standard form.` },
    ],
    worksheet: [
      `State Hooke's Law and draw the stress-strain curve.`,
      `Explain terminal velocity concept and state its expression.`,
      `What is capillarity? Write down the capillary rise formula.`,
      `State Pascal's Law and list two applications.`,
      `Define Reynolds number and state its significance.`,
    ],
    applications: [
      [`Civil Construction`, `I-beams are designed using stress calculations to carry heavy loads without bending.`],
      [`Inkjet Printers`, `Ink droplets are formed using capillary pressure control in nozzle structures.`],
    ],
  },
  8:
  {
    title: `Heat and Thermodynamics`,
    definitions: [
      [`Thermodynamic System`, `A collection of matter separated from surroundings by boundaries, characterized by state variables.`],
      [`Isothermal Process`, `A thermodynamic transition that occurs at a constant temperature, meaning delta_T = 0.`],
      [`Entropy`, `A measure of the molecular disorder or randomness of a thermodynamic system.`],
    ],
    formulas: [
      `First Law of Thermodynamics: dQ = dU + dW`,
      `Work (Ideal Gas): W = P * delta_V | Isothermal W = n*R*T * ln(V2/V1)`,
      `Carnot Efficiency: eta = 1 - (T_c / T_h)`,
      `Specific Heat: Q = m * c * delta_T`,
    ],
    examples: [
      { q: `A heat engine operates between temperatures of 300K and 600K. Find its maximum Carnot efficiency.`, ans: `eta = 1 - T_c / T_h = 1 - 300 / 600 = 1 - 0.5 = 0.5 = 50%.` },
    ],
    hots: [
      { q: `Differentiate between Cp and Cv for an ideal gas and prove Mayer's relation Cp - Cv = R.`, ans: `Cp is specific heat at constant pressure, Cv at constant volume.\nAt constant volume: dQ = dU = Cv * dT.\nAt constant pressure: dQ = dU + P*dV => Cp * dT = Cv * dT + P*dV.\nSince PV = RT for 1 mole: P*dV = R*dT. Substitute to get Cp*dT = Cv*dT + R*dT => Cp - Cv = R.` },
    ],
    worksheet: [
      `State Zeroth and Second laws of thermodynamics.`,
      `Explain the working steps of a Carnot Cycle.`,
      `Distinguish between isothermal and adiabatic processes.`,
      `A system absorbs 500J of heat and does 200J of work. Find change in internal energy.`,
      `Define coefficient of performance of a refrigerator.`,
    ],
    applications: [
      [`Power Turbines`, `Gas turbine engines use Carnot cycle steps to generate electricity at power plants.`],
      [`HVAC Systems`, `Refrigerators transfer indoor heat outwards using compressed refrigerants.`],
    ],
  },
  9:
  {
    title: `Kinetic Theory of Gases`,
    definitions: [
      [`Ideal Gas`, `A theoretical gas composed of randomly moving point particles that interact only through elastic collisions.`],
      [`Degrees of Freedom`, `The number of independent coordinates required to describe the state or motion of a molecule completely.`],
      [`Mean Free Path`, `The average distance traveled by a gas molecule between two successive molecular collisions.`],
    ],
    formulas: [
      `Gas Pressure: P = (1/3) * rho * v_rms^2`,
      `RMS Speed: v_rms = sqrt(3 * k_B * T / m)`,
      `Equipartition Energy: U = (f/2) * k_B * T (f = degrees of freedom)`,
      `Mean Free Path: lambda = 1 / (sqrt(2) * pi * d^2 * n)`,
    ],
    examples: [
      { q: `Calculate RMS speed of oxygen molecules (m=5.3*10^-26 kg) at 300K. (k_B = 1.38*10^-23 J/K)`, ans: `v_rms = sqrt(3 * 1.38*10^-23 * 300 / (5.3*10^-26)) = sqrt(1.242*10^-20 / (5.3*10^-26)) = sqrt(2.34*10^5) = 484 m/s.` },
    ],
    hots: [
      { q: `State the law of equipartition of energy and calculate specific heat ratios Cp/Cv for monatomic and diatomic gases.`, ans: `Law states each degree of freedom contributes 0.5*k_B*T energy per molecule.\nFor monatomic (f=3): Cv = 1.5*R, Cp = 2.5*R => ratio gamma = 5/3 = 1.67.\nFor diatomic (f=5, no vibration): Cv = 2.5*R, Cp = 3.5*R => ratio gamma = 7/5 = 1.40.` },
    ],
    worksheet: [
      `List the primary postulates of kinetic theory of gases.`,
      `Define mean free path and write its expression.`,
      `Calculate average kinetic energy of a gas molecule at 27 degrees Celsius.`,
      `Explain degrees of freedom for a triatomic linear molecule.`,
      `State Avogadro's hypothesis as derived from kinetic theory.`,
    ],
    applications: [
      [`Vacuum Tech`, `Insulating layers in thermos flasks are pumped down to high vacuums, increasing mean free path to prevent conduction.`],
      [`Atmospheric Physics`, `Gas compositions at different altitudes are modeled using molecular speeds.`],
    ],
  },
  10:
  {
    title: `Oscillations`,
    definitions: [
      [`Simple Harmonic Motion (SHM)`, `A periodic motion where the restoring force is directly proportional to displacement and acts towards equilibrium.`],
      [`Simple Pendulum`, `A point mass suspended by a massless, inextensible string from a rigid support, executing oscillations.`],
      [`Resonance`, `The phenomenon where a system oscillates at maximum amplitude when driven at its natural frequency.`],
    ],
    formulas: [
      `SHM Equation: d^2x/dt^2 + omega^2 * x = 0 | Displacement: x = A * sin(omega*t + phi)`,
      `Velocity: v = omega * sqrt(A^2 - x^2) | Acceleration: a = -omega^2 * x`,
      `Pendulum Period: T = 2 * pi * sqrt(L / g) | Spring Period: T = 2 * pi * sqrt(m / k)`,
    ],
    examples: [
      { q: `Find the period of a simple pendulum of length 1m on Earth's surface where g = 9.8 m/s^2.`, ans: `T = 2 * pi * sqrt(1 / 9.8) = 2 * 3.1416 * 0.319 = 2.01 seconds.` },
    ],
    hots: [
      { q: `Show that the total mechanical energy of a particle executing simple harmonic motion remains constant at all points.`, ans: `Kinetic Energy: KE = 0.5 * m * v^2 = 0.5 * m * omega^2 * (A^2 - x^2).\nPotential Energy: PE = 0.5 * k * x^2 = 0.5 * m * omega^2 * x^2.\nTotal Energy: E = KE + PE = 0.5 * m * omega^2 * A^2 (independent of x, hence constant).` },
    ],
    worksheet: [
      `Define amplitude, time period, and phase of SHM.`,
      `Write down the expression for velocity and acceleration of a particle in SHM.`,
      `What is a seconds pendulum? Find its length.`,
      `Explain damped and forced oscillations with examples.`,
      `A spring of constant 200 N/m carries a mass of 2kg. Find oscillation frequency.`,
    ],
    applications: [
      [`Watchmaking`, `Quartz crystal clocks keep precise time using resonant electric oscillations.`],
      [`Automobile Suspension`, `Shock absorbers damp spring oscillations, preventing bounce on bumpy roads.`],
    ],
  },
  11:
  {
    title: `Waves`,
    definitions: [
      [`Transverse and Longitudinal Waves`, `Transverse waves oscillate perpendicular to propagation (e.g. light); longitudinal waves oscillate parallel (e.g. sound).`],
      [`Beats`, `The periodic variation in sound intensity heard when two waves of slightly different frequencies interfere.`],
      [`Doppler Effect`, `The apparent change in frequency of a wave due to relative motion between the source and observer.`],
    ],
    formulas: [
      `Wave Velocity: v = f * lambda | Speed of Sound (gas): v = sqrt(gamma * P / rho)`,
      `Apparent Doppler Frequency: f' = f * [(v +- v_o) / (v -+ v_s)]`,
      `Standing Wave (string fixed at ends): f_n = n * v / (2 * L)`,
    ],
    examples: [
      { q: `A train blowing a whistle of frequency 400Hz approaches a station at 30 m/s. Find apparent frequency heard by listener on platform. (Speed of sound = 330 m/s)`, ans: `f' = f * [v / (v - v_s)] = 400 * [330 / (330 - 30)] = 400 * [330 / 300] = 440 Hz.` },
    ],
    hots: [
      { q: `Explain Newton's formula for the velocity of sound in air and Laplace's correction to it.`, ans: `Newton assumed isothermal conditions: v = sqrt(P/rho) = sqrt(1.013*10^5 / 1.29) = 280 m/s (underestimates).\nLaplace corrected that compression is adiabatic: v = sqrt(gamma*P/rho). For air gamma=1.4.\nv = sqrt(1.4 * 280^2) = 331 m/s (matches experimental values).` },
    ],
    worksheet: [
      `State the principle of superposition of waves.`,
      `Explain how beats are formed and state the formula for beat frequency.`,
      `Show that only odd harmonics are produced in a closed organ pipe.`,
      `A wave is given by y = 5*sin(100t - 2x). Find frequency and wavelength.`,
      `List three applications of the Doppler effect in modern technology.`,
    ],
    applications: [
      [`Medical Imaging`, `Ultrasound scanners check blood velocity maps using Doppler shifts of reflections.`],
      [`Astro Navigation`, `Radar speed guns measure automobile speeds using radio frequency shifts.`],
    ],
  },
};

export const chemistry11Data: Record<number, ChapterContent> = {
  1:
  {
    title: `Basic Concepts of Chemistry and Chemical Calculations`,
    definitions: [
      [`Mole`, `The SI unit of amount of substance containing exactly 6.022 * 10^23 elementary entities.`],
      [`Equivalent Mass`, `The mass of a substance which combines with or displaces 1g of hydrogen, 8g of oxygen, or 35.5g of chlorine.`],
      [`Limiting Reagent`, `The reactant in a chemical reaction that is completely consumed first, limiting the amount of product formed.`],
    ],
    formulas: [
      `Number of Moles: Moles = Given Mass / Molar Mass`,
      `Gram Equivalent: Eq = Molar Mass / Equivalence Factor (Acidity / Basicity)`,
      `Empirical Formula: Simplest ratio of constituent atoms in a compound`,
    ],
    examples: [
      { q: `Calculate equivalent mass of Sulphuric Acid (H2SO4, Molar Mass = 98 g/mol).`, ans: `H2SO4 is dibasic, so equivalence factor = 2.\nEquivalent Mass = Molar Mass / Basicity = 98 / 2 = 49 g/eq.` },
    ],
    hots: [
      { q: `If 50kg of Nitrogen gas and 10kg of Hydrogen gas are mixed to produce Ammonia (NH3), identify the limiting reagent.`, ans: `Reaction: N2 + 3H2 -> 2NH3.\nMoles N2 = 50000 / 28 = 1785.7 moles | Moles H2 = 10000 / 2 = 5000 moles.\nRequired H2 for N2 = 1785.7 * 3 = 5357 moles.\nSince only 5000 moles H2 are available, Hydrogen is the limiting reagent.` },
    ],
    worksheet: [
      `Define relative atomic mass.`,
      `Calculate molar mass of Glucose (C6H12O6).`,
      `Explain equivalent mass of an oxidizing agent with an example.`,
      `Determine empirical formula of a compound having 40% C, 6.7% H, and 53.3% O.`,
      `Differentiate between empirical formula and molecular formula.`,
    ],
    applications: [
      [`Pharmaceuticals`, `Precise mole ratios ensure drug tablets contain correct stoichiometric values of active ingredients.`],
      [`Metallurgy`, `Furnace yields are optimized by calculating limiting ore inputs to prevent fuel waste.`],
    ],
  },
  2:
  {
    title: `Quantum Mechanical Model of Atom`,
    definitions: [
      [`Quantum Numbers`, `A set of four integers (n, l, m, s) that describe the energy, shape, orientation, and spin of an electron.`],
      [`Heisenberg Uncertainty Principle`, `It is impossible to determine simultaneously both the position and momentum of a subatomic particle with absolute precision.`],
      [`Orbital`, `A three-dimensional space around the nucleus where the probability of finding an electron is maximum.`],
    ],
    formulas: [
      `De Broglie Wavelength: lambda = h / (m * v) = h / p`,
      `Heisenberg Principle: delta_x * delta_p >= h / (4 * pi)`,
      `Maximum Electrons in Shell: Max = 2 * n^2`,
    ],
    examples: [
      { q: `Calculate de Broglie wavelength of a 0.1kg ball moving at 60 m/s. (h = 6.626*10^-34 J-s)`, ans: `lambda = h / (m*v) = 6.626*10^-34 / (0.1 * 60) = 6.626*10^-34 / 6 = 1.1*10^-34 meters.` },
    ],
    hots: [
      { q: `State and explain Aufbau Principle, Pauli's Exclusion Principle, and Hund's Rule of Maximum Multiplicity.`, ans: `(1) Aufbau: Orbitals are filled in order of increasing energy (n+l rule).\n(2) Pauli: No two electrons in an atom can have the same set of four quantum numbers.\n(3) Hund: Pairing of electrons in degenerate orbitals does not occur until each orbital is singly occupied.` },
    ],
    worksheet: [
      `Describe the shapes of s, p, and d orbitals.`,
      `Write down the electronic configuration of Chromium (Z=24) and explain its stability anomaly.`,
      `What are the four quantum numbers? Define each.`,
      `Calculate the total number of orbitals associated with principal quantum number n=3.`,
      `State Heisenberg's uncertainty principle equation.`,
    ],
    applications: [
      [`Spectroscopy`, `Laser physics depends on electronic transition jumps between shell states.`],
      [`Materials Engineering`, `Semiconductor bands are engineered by mapping quantum shells of elements.`],
    ],
  },
  3:
  {
    title: `Periodic Classification of Elements`,
    definitions: [
      [`Ionization Energy`, `The minimum energy required to remove an electron from an isolated gaseous atom in its ground state.`],
      [`Electronegativity`, `The relative tendency of a bonded atom to attract the shared pair of electrons towards itself.`],
      [`Electron Gain Enthalpy`, `The enthalpy change occurring when an electron is added to an isolated gaseous atom to form a negative ion.`],
    ],
    formulas: [
      `Effective Nuclear Charge: Z_eff = Z - S (screening constant S)`,
      `Electronegativity (Pauling): chi_A - chi_B = 0.208 * sqrt(delta)`,
    ],
    examples: [
      { q: `Why is the ionization energy of Nitrogen (Z=7) higher than Oxygen (Z=8)?`, ans: `Nitrogen has electronic configuration 1s2 2s2 2p3, which possesses a stable, half-filled p subshell. Oxygen has 1s2 2s2 2p4. Removing an electron from Nitrogen requires overcoming this exchange stability, hence higher IE.` },
    ],
    hots: [
      { q: `Explain periodic trends in atomic radii, ionization enthalpy, and electronegativity down a group and across a period.`, ans: `Across a period: atomic radius decreases (effective nuclear charge increases). IE and electronegativity increase.\nDown a group: atomic radius increases (new shells added). IE and electronegativity decrease due to increased shielding.` },
    ],
    worksheet: [
      `State modern periodic law.`,
      `What is lanthanide contraction? State its consequence.`,
      `Arrange the following in increasing order of size: F, F-, O2-.`,
      `Define electronegativity and state its trends.`,
      `Explain why noble gases have positive electron gain enthalpies.`,
    ],
    applications: [
      [`Chemical Synthesis`, `Catalysts are selected based on electronegativity values to optimize reaction bonding.`],
      [`Corrosion Science`, `Anti-corrosive coatings use highly electropositive metals like zinc for sacrificial protection.`],
    ],
  },
  4:
  {
    title: `Hydrogen`,
    definitions: [
      [`Isotopes of Hydrogen`, `Hydrogen has three isotopes: Protium (1H1), Deuterium (1H2 or D), and Tritium (1H3 or T).`],
      [`Water Gas`, `A mixture of carbon monoxide and hydrogen gases (CO + H2) produced by reacting steam with red hot coal.`],
      [`Heavy Water`, `Deuterium oxide (D2O), used as a neutron moderator in nuclear reactor systems.`],
    ],
    formulas: [
      `Water Gas Shift: CO + H2O -> CO2 + H2 (Fe-Cr catalyst)`,
      `Heavy Water electrolysis: selective migration enrichment of D2O`,
    ],
    examples: [
      { q: `Explain parahydrogen and orthohydrogen.`, ans: `Orthohydrogen has parallel nuclear spins in the H2 molecule. Parahydrogen has antiparallel nuclear spins. At room temperature, hydrogen is 75% ortho and 25% para.` },
    ],
    hots: [
      { q: `Describe the preparation of hydrogen peroxide (H2O2) and explain its oxidizing and reducing properties with equations.`, ans: `Prepared by reacting barium peroxide with cold sulphuric acid: BaO2 + H2SO4 -> BaSO4 + H2O2.\nOxidizing: H2O2 + 2KI + H2O -> 2KOH + I2.\nReducing: H2O2 + Ag2O -> 2Ag + H2O + O2.` },
    ],
    worksheet: [
      `Compare the properties of protium, deuterium, and tritium.`,
      `Describe the syngas synthesis process.`,
      `Why is tritium radioactive? Write down its decay reaction.`,
      `Explain the structures of water and hydrogen peroxide.`,
      `What are ionic, covalent, and interstitial hydrides? Give examples.`,
    ],
    applications: [
      [`Nuclear Energy`, `Heavy water moderator slows neutrons down to maintain nuclear chain reactions.`],
      [`Green Fuel`, `Hydrogen fuel cells power zero-emission electric buses by reacting H2 with atmospheric O2.`],
    ],
  },
  5:
  {
    title: `Alkali and Alkaline Earth Metals`,
    definitions: [
      [`Alkali Metals`, `Group 1 elements (Li, Na, K, Rb, Cs, Fr) having a single s valence electron, forming strongly alkaline oxides.`],
      [`Alkaline Earth Metals`, `Group 2 elements (Be, Mg, Ca, Sr, Ba, Ra) having two s valence electrons, forming basic hydroxides.`],
      [`Diagonal Relationship`, `The similarity in properties of certain light elements in the second period with adjacent elements in the third period (e.g. Li-Mg, Be-Al).`],
    ],
    formulas: [
      `Plaster of Paris: CaSO4 . 0.5H2O`,
      `Gypsum dehydration: CaSO4 . 2H2O -> CaSO4 . 0.5H2O + 1.5H2O`,
    ],
    examples: [
      { q: `Why does Lithium show a diagonal relationship with Magnesium?`, ans: `Lithium and Magnesium have similar ionic sizes (Li+ = 0.76A, Mg2+ = 0.72A) and similar electronegativities (Li = 1.0, Mg = 1.2), yielding identical polarizing powers.` },
    ],
    hots: [
      { q: `Describe the industrial Solvay Process for the preparation of Sodium Carbonate (Na2CO3) with all chemical equations.`, ans: `Process involves passing CO2 into ammoniacal brine:\nNH3 + H2O + CO2 -> NH4HCO3.\nNH4HCO3 + NaCl -> NaHCO3 + NH4Cl.\nNaHCO3 is heated to yield sodium carbonate: 2NaHCO3 -> Na2CO3 + H2O + CO2.` },
    ],
    worksheet: [
      `Explain why Group 1 metals impart characteristic colors to Bunsen burner flames.`,
      `State the biological importance of Calcium and Magnesium ions.`,
      `Describe the preparation and uses of Quicklime (CaO).`,
      `Why is beryllium anomalous in Group 2?`,
      `What is dead burnt plaster? How is it formed?`,
    ],
    applications: [
      [`Construction Materials`, `Cement formulations depend on gypsum additions to regulate setting speeds during pouring.`],
      [`Medicine`, `Epsom salt (MgSO4.7H2O) and milk of magnesia are used as laxatives and antacids.`],
    ],
  },
  6:
  {
    title: `Gaseous State`,
    definitions: [
      [`Boyle Law`, `At constant temperature, the volume of a given mass of gas is inversely proportional to its pressure.`],
      [`Dalton Law of Partial Pressures`, `The total pressure exerted by a mixture of non-reacting gases is equal to the sum of their individual partial pressures.`],
      [`Critical Temperature`, `The temperature above which a gas cannot be liquefied, no matter how much pressure is applied.`],
    ],
    formulas: [
      `Ideal Gas Law: P * V = n * R * T`,
      `van der Waals equation: (P + a*n^2/V^2) * (V - n*b) = n * R * T`,
      `Graham's Law: Rate_1 / Rate_2 = sqrt(M_2 / M_1)`,
    ],
    examples: [
      { q: `A gas occupies 2L at 1 atm. What volume will it occupy at 4 atm if temperature is constant?`, ans: `Apply Boyle's law: P1*V1 = P2*V2.\n1 * 2 = 4 * V2 => V2 = 2/4 = 0.5 Liters.` },
    ],
    hots: [
      { q: `Explain van der Waals corrections for real gases regarding pressure correction and volume correction.`, ans: `Real gases experience molecular attractions, reducing wall collision pressure. Pressure correction term is a*n^2/V^2.\nMolecules occupy finite spaces. The excluded volume correction is n*b (b = 4 * actual volume of molecules).` },
    ],
    worksheet: [
      `State Charles's Law and Gay-Lussac's Law.`,
      `Write the values of universal gas constant R in two different units.`,
      `State Dalton's law of partial pressures equation.`,
      `Explain critical state parameters: Tc, Pc, Vc.`,
      `Describe the Linde process for liquefaction of gases.`,
    ],
    applications: [
      [`Scuba Diving`, `Gas mixture pressure changes down deep depths are managed using Dalton's partial pressure rules.`],
      [`Aerosol Sprays`, `Deodorants contain liquefied gases under pressure that vaporize immediately upon trigger release.`],
    ],
  },
  7:
  {
    title: `Thermodynamics`,
    definitions: [
      [`Enthalpy`, `The total heat content of a system, equal to internal energy plus product of pressure and volume (H = U + PV).`],
      [`Hess Law of Constant Heat Summation`, `The enthalpy change of a chemical reaction is constant, whether it occurs in one step or in several steps.`],
      [`Gibbs Free Energy`, `A thermodynamic potential that measures the maximum reversible work performable by a system, predicting reaction spontaneity.`],
    ],
    formulas: [
      `First Law: delta_U = q + w | Expansion Work: w = -P * delta_V`,
      `Gibbs Relation: delta_G = delta_H - T * delta_S`,
      `Spontaneity: delta_G < 0 (spontaneous), delta_G = 0 (equilibrium), delta_G > 0 (non-spontaneous)`,
    ],
    examples: [
      { q: `Calculate Gibbs free energy change for a reaction if delta_H = -110 kJ, delta_S = +150 J/K at 298K.`, ans: `delta_G = delta_H - T*delta_S.\nConvert delta_S to kJ: 150/1000 = 0.15 kJ/K.\ndelta_G = -110 - 298*(0.15) = -110 - 44.7 = -154.7 kJ. (Spontaneous)` },
    ],
    hots: [
      { q: `Derive the relation delta_H = delta_U + delta_n_g * R * T for gaseous chemical reactions.`, ans: `By definition, H = U + PV => delta_H = delta_U + delta_(PV).\nFor ideal gases, PV = nRT. At constant temperature: delta_(PV) = delta_(nRT) = delta_n_g * R * T.\nSubstitute to get: delta_H = delta_U + delta_n_g * R * T.` },
    ],
    worksheet: [
      `Distinguish between state functions and path functions.`,
      `State the First and Third Laws of Thermodynamics.`,
      `State Hess's Law and list two applications.`,
      `What is entropy? Describe its changes when liquid freezes.`,
      `Define standard enthalpy of formation.`,
    ],
    applications: [
      [`Chemical Engineering`, `Reaction spontaneity is calculated using Gibbs values to avoid explosive mixtures.`],
      [`Internal Combustion`, `Engine design efficiency is optimized by mapping enthalpy releases of fuel combustion.`],
    ],
  },
  8:
  {
    title: `Physical and Chemical Equilibrium`,
    definitions: [
      [`Reversible Reaction`, `A reaction that can proceed in both forward and reverse directions, forming equilibrium.`],
      [`Le Chatelier Principle`, `If a constraint is applied to a system at equilibrium, the system shifts to counteract that constraint.`],
      [`Equilibrium Constant`, `The ratio of the product of concentrations of products to reactants, raised to stoichiometric powers.`],
    ],
    formulas: [
      `Kp and Kc relation: Kp = Kc * (R * T)^delta_n_g`,
      `Reaction Quotient: Q = [Products] / [Reactants] (non-equilibrium states)`,
      `Gibbs relation: delta_G_0 = -R * T * ln(K)`,
    ],
    examples: [
      { q: `Write relation between Kp and Kc for synthesis of Ammonia: N2 + 3H2 <=> 2NH3.`, ans: `delta_n_g = Moles products - Moles reactants = 2 - (1 + 3) = -2.\nKp = Kc * (RT)^-2.` },
    ],
    hots: [
      { q: `Apply Le Chatelier's principle to evaluate optimal conditions for Ammonia synthesis in Haber's Process.`, ans: `Reaction: N2 + 3H2 <=> 2NH3 (Exothermic, delta_H = -92 kJ).\n(1) Pressure: 4 moles reactants -> 2 moles products. Increasing pressure shifts forward.\n(2) Temperature: Reaction is exothermic. Lower temperature shifts forward. (Optimal: 450C with Fe catalyst for speed).` },
    ],
    worksheet: [
      `State Le Chatelier's Principle.`,
      `Differentiate between homogeneous and heterogeneous equilibria with examples.`,
      `If Kc = 4 for a reaction at 300K, find Kc for the reverse reaction.`,
      `Write the expressions of Kp and Kc for thermal decomposition of CaCO3.`,
      `Explain how reaction quotient Q predicts equilibrium shifts.`,
    ],
    applications: [
      [`Industrial Chemistry`, `Ammonia yields are maximized by maintaining high pressures of 200 atm.`],
      [`Ocean Acidification`, `Dissolved carbon dioxide shifts acid carbonate buffers when CO2 emissions increase.`],
    ],
  },
  9:
  {
    title: `Solutions`,
    definitions: [
      [`Henry Law`, `The solubility of a gas in a liquid is directly proportional to the partial pressure of the gas above the liquid.`],
      [`Raoult Law`, `The partial vapor pressure of a volatile component in a solution is proportional to its mole fraction.`],
      [`Colligative Properties`, `Properties of solutions that depend only on the number of solute particles, not on their nature.`],
    ],
    formulas: [
      `Molarity: M = Moles Solute / Volume Solution (L)`,
      `Raoult's Law: p_A = p_A_0 * x_A`,
      `Elevation in Boiling Point: delta_Tb = Kb * m (m = molality)`,
      `Osmotic Pressure: pi = i * C * R * T (i = van 't Hoff factor)`,
    ],
    examples: [
      { q: `Find molarity of a solution containing 4g NaOH (Molar mass = 40) in 250ml water.`, ans: `Moles NaOH = 4 / 40 = 0.1 moles.\nVolume = 0.25 Liters.\nMolarity M = Moles / Vol = 0.1 / 0.25 = 0.4 M.` },
    ],
    hots: [
      { q: `Describe non-ideal solutions showing positive and negative deviations from Raoult's law with examples.`, ans: `(1) Positive: A-B interactions are weaker than A-A and B-B. Vapor pressure is higher than expected. Example: Ethanol and Acetone.\n(2) Negative: A-B interactions are stronger (e.g. hydrogen bonding). Vapor pressure is lower. Example: Chloroform and Acetone.` },
    ],
    worksheet: [
      `State Henry's Law and its limitations.`,
      `Define molality and mole fraction.`,
      `Why is elevation of boiling point a colligative property?`,
      `What is osmosis? Explain reverse osmosis (RO).`,
      `Calculate osmotic pressure of 0.1M glucose solution at 27C.`,
    ],
    applications: [
      [`Water Purification`, `Reverse osmosis desalination plants filter salts using semipermeable membranes.`],
      [`Automotive Systems`, `Ethylene glycol anti-freeze is added to radiator water to depress freezing points.`],
    ],
  },
  10:
  {
    title: `Chemical Bonding`,
    definitions: [
      [`Octet Rule`, `Atoms tend to combine so that they each have eight electrons in their valence shell, achieving noble configuration.`],
      [`Covalent Bond`, `A chemical bond formed by the sharing of one or more electron pairs between constituent atoms.`],
      [`Hybridization`, `The mixing of atomic orbitals of comparable energies to form new degenerate hybrid orbitals.`],
    ],
    formulas: [
      `Formal Charge: FC = [Valence] - [Lone Pairs] - 0.5 * [Shared]`,
      `Dipole Moment: mu = q * d (SI Unit: Debye)`,
      `Bond Order: BO = 0.5 * (N_b - N_a)`,
    ],
    examples: [
      { q: `Determine hybridization of Carbon in Ethene (C2H4).`, ans: `Carbon forms 3 sigma bonds (two C-H, one C-C) and 0 lone pairs. Steric number = 3. Therefore, hybridization is sp2 (trigonal planar geometry).` },
    ],
    hots: [
      { q: `Draw Molecular Orbital energy diagram for Nitrogen molecule (N2) and calculate its bond order and magnetic nature.`, ans: `N2 has 14 electrons: KK sigma(2s)2 sigma*(2s)2 pi(2px)2 pi(2py)2 sigma(2pz)2.\nN_b = 8 (excluding KK), N_a = 2.\nBond Order = 0.5 * (8 - 2) = 3 (triple bond).\nAll electrons are paired, so N2 is diamagnetic.` },
    ],
    worksheet: [
      `State VSEPR theory postulates.`,
      `Explain the shapes of NH3 and H2O molecules using lone pairs.`,
      `What is a coordinate covalent bond? Give one example.`,
      `Calculate formal charge of oxygen atoms in Ozone (O3).`,
      `Differentiate between sigma and pi bonds.`,
    ],
    applications: [
      [`Material Design`, `Diamond vs Graphite properties are mapped using sp3 vs sp2 carbon hybridization configurations.`],
      [`Drug Binding`, `Pharmaceutical targets are matched to ligands using hydrogen bonding dipole calculations.`],
    ],
  },
  11:
  {
    title: `Fundamentals of Organic Chemistry`,
    definitions: [
      [`Catenation`, `The unique ability of carbon atoms to link together to form long open or closed chain structures.`],
      [`Functional Group`, `An atom or group of atoms in an organic molecule that determines its characteristic chemical properties.`],
      [`Isomerism`, `The phenomenon where organic compounds have identical molecular formulas but different structural properties.`],
    ],
    formulas: [
      `IUPAC Name = Prefix + Word Root + Suffix`,
      `Alkanes: C_n H_{2n+2} | Alkenes: C_n H_{2n} | Alkynes: C_n H_{2n-2}`,
    ],
    examples: [
      { q: `Write structural formula of IUPAC name: 2-Methylbut-2-ene.`, ans: `Parent chain is butene (4 carbons with double bond at C2). Methyl substituent at C2.\nFormula: CH3 - C(CH3) = CH - CH3.` },
    ],
    hots: [
      { q: `Classify structural isomerism in organic compounds with clear structures for each category.`, ans: `(1) Chain Isomerism: butane vs isobutane.\n(2) Position Isomerism: propan-1-ol vs propan-2-ol.\n(3) Functional Isomerism: dimethyl ether vs ethanol.\n(4) Metamerism: diethyl ether vs methyl propyl ether.` },
    ],
    worksheet: [
      `Give reasons for the tetravalency of carbon.`,
      `Write IUPAC names for: (1) CH3-CH(OH)-CH3, (2) CH3-CHO.`,
      `What are homologous series? State their properties.`,
      `Explain stereoisomerism types.`,
      `Describe the purification technique of chromatography.`,
    ],
    applications: [
      [`Petroleum Refining`, `Distillation cuts isolate linear octane fuels from branched isomer configurations.`],
      [`Perfume Design`, `Ester functional groups are synthesized to produce sweet, natural fruit fragrances.`],
    ],
  },
  12:
  {
    title: `Basic Rules of Organic Reactions`,
    definitions: [
      [`Electrophile`, `An electron-deficient species that accepts electron pairs in chemical reactions, acting as a Lewis acid.`],
      [`Nucleophile`, `An electron-rich species that donates electron pairs in chemical reactions, acting as a Lewis base.`],
      [`Inductive Effect`, `The permanent polarization of a covalent bond caused by electronegativity differences along a carbon chain.`],
    ],
    formulas: [
      `Stability: Tertiary carbocation > Secondary > Primary > Methyl`,
      `Inductive effect: +I (electron release: -CH3), -I (electron pull: -Cl, -NO2)`,
    ],
    examples: [
      { q: `Classify the following as electrophiles or nucleophiles: H+, OH-, BF3, NH3.`, ans: `Electrophiles (electron acceptors): H+, BF3.\nNucleophiles (electron donors): OH-, NH3.` },
    ],
    hots: [
      { q: `Explain Electromeric effect, Resonance effect, and Hyperconjugation stability of alkyl radicals.`, ans: `(1) Electromeric: temporary polarization of multiple bonds on demand of reagent.\n(2) Resonance: delocalization of pi electrons in conjugated systems.\n(3) Hyperconjugation: no-bond resonance involving sigma C-H electrons and empty p orbitals, stabilizing carbocations.` },
    ],
    worksheet: [
      `Differentiate between homolytic and heterolytic bond cleavages.`,
      `Explain inductive effect with an example.`,
      `Why is tertiary carbocation highly stable?`,
      `What is a free radical? Describe its hybridization.`,
      `Compare nucleophilicity and basicity.`,
    ],
    applications: [
      [`Polymer Chemistry`, `Free radical initiators open double bonds in monomers to manufacture plastics.`],
      [`Synthetic Biology`, `Nucleophilic attacks of amine residues link peptide chains in synthetic insulin.`],
    ],
  },
  13:
  {
    title: `Hydrocarbons`,
    definitions: [
      [`Wurtz Reaction`, `The coupling of two alkyl halides in the presence of sodium metal in dry ether to form higher alkanes.`],
      [`Markownikoff Rule`, `In the addition of unsymmetrical reagents to unsymmetrical alkenes, the negative part adds to the carbon with fewer hydrogen atoms.`],
      [`Aromaticity`, `The property of conjugated cyclic planar rings to show high stability due to 4n+2 pi delocalized electrons (Huckel rule).`],
    ],
    formulas: [
      `Huckel's Rule: 4n + 2 pi electrons = Aromatic`,
      `Ozonolysis: Alkene + O3 -> Ozonide -> Aldehydes / Ketones`,
    ],
    examples: [
      { q: `Convert Propyne to Propene.`, ans: `React Propyne (CH3-C#CH) with Lindlar catalyst (Pd/CaCO3) under hydrogen gas to selectively reduce it to Propene (CH3-CH=CH2).` },
    ],
    hots: [
      { q: `Describe Electrophilic Substitution reactions in Benzene, giving mechanisms for Nitration and Friedel-Crafts Alkylation.`, ans: `(1) Nitration: Reagents HNO3/H2SO4 generate electrophile NO2+. NO2+ attacks benzene ring forming sigma complex, which loses H+ to yield nitrobenzene.\n(2) Alkylation: Reagents RCl/AlCl3 generate R+. R+ attacks ring to yield alkylbenzene.` },
    ],
    worksheet: [
      `Write the chemical equation for Kolbe's electrolytic synthesis.`,
      `Predict the product: Propene + HBr in presence of peroxide (Kharasch effect).`,
      `State Huckel's rule with examples of aromatic, non-aromatic, and anti-aromatic systems.`,
      `Describe the ozonolysis of But-2-ene.`,
      `How does calcium carbide react with water? Write equation.`,
    ],
    applications: [
      [`Petrochemicals`, `Cracking of heavy paraffin fractions produces lower alkenes, key for polymer production.`],
      [`Industrial Solvents`, `Benzene derivatives act as heavy solvents to manufacture synthetic dyes.`],
    ],
  },
  14:
  {
    title: `Haloalkanes and Haloarenes`,
    definitions: [
      [`SN1 Reaction`, `A nucleophilic substitution reaction occurring in two steps, whose rate depends only on alkyl halide concentration.`],
      [`SN2 Reaction`, `A nucleophilic substitution reaction occurring in a single concerted step, leading to Walden inversion of configuration.`],
      [`Fittig Reaction`, `The coupling of two aryl halides with sodium metal in dry ether to form diphenyl.`],
    ],
    formulas: [
      `SN1 Rate: Rate = k * [R-X] (forms carbocation intermediate)`,
      `SN2 Rate: Rate = k * [R-X] * [Nu-] (backside attack)`,
    ],
    examples: [
      { q: `Why is chlorobenzene less reactive towards nucleophilic substitution than chloroethane?`, ans: `In chlorobenzene, the lone pair on chlorine enters into resonance with the benzene ring, imparting partial double bond character to C-Cl bond, making it stronger and harder to cleave.` },
    ],
    hots: [
      { q: `Contrast SN1 and SN2 reaction pathways regarding steps, kinetics, intermediates, and stereochemical outcomes.`, ans: `SN1: 2 steps, 1st order kinetics, carbocation intermediate, racemization. Favored by polar solvents and tertiary halides.\nSN2: 1 step, 2nd order kinetics, transition state, inversion. Favored by primary halides and strong nucleophiles.` },
    ],
    worksheet: [
      `State Swarts reaction and Finkelstein reaction equations.`,
      `Write a note on Sandmeyer's reaction.`,
      `What are Grignard reagents? How are they prepared?`,
      `Explain elimination reactions in haloalkanes (Saytzeff's Rule).`,
      `Why are haloalkanes polar in nature?`,
    ],
    applications: [
      [`Anesthetics`, `Halothane gas is inhaled to act as a general anesthetic during clinical surgeries.`],
      [`Agriculture`, `Organochlorine compounds act as heavy insecticides protecting bulk food crops.`],
    ],
  },
  15:
  {
    title: `Environmental Chemistry`,
    definitions: [
      [`Eutrophication`, `The nutrient enrichment of water bodies leading to excessive growth of algae, depleting dissolved oxygen levels.`],
      [`Acid Rain`, `Rainwater having pH below 5.6 caused by atmospheric sulphur dioxide and nitrogen oxide emissions reacting with moisture.`],
      [`Biochemical Oxygen Demand (BOD)`, `The amount of dissolved oxygen required by aerobic bacteria to decompose organic wastes in a water sample.`],
    ],
    formulas: [
      `Acid Rain formation: SO2 + O2 + H2O -> H2SO4`,
      `Ozone depletion: CF2Cl2 -> CF2Cl + Cl* | Cl* + O3 -> ClO* + O2`,
    ],
    examples: [
      { q: `Explain the greenhouse effect and list the primary greenhouse gases.`, ans: `The trapping of solar infrared radiation by atmospheric gases, warming the planet. Primary gases: Carbon dioxide (CO2), Methane (CH4), Water vapor, Chlorofluorocarbons.` },
    ],
    hots: [
      { q: `Describe the chemical mechanisms of ozone layer depletion in stratosphere by chlorofluorocarbons (CFCs).`, ans: `CFCs are decomposed by UV light in stratosphere, releasing free chlorine radicals: CF2Cl2 -> CF2Cl + Cl*.\nChlorine radical reacts with ozone to form chlorine monoxide radical and oxygen: Cl* + O3 -> ClO* + O2.\nClO* reacts with atomic oxygen: ClO* + O -> Cl* + O2, regenerating the chlorine catalyst to destroy more ozone.` },
    ],
    worksheet: [
      `Define BOD and COD.`,
      `What is photochemical smog? State its key components.`,
      `List the harmful effects of acid rain on marble structures.`,
      `Explain how green chemistry helps reduce industrial pollution.`,
      `What are primary and secondary air pollutants?`,
    ],
    applications: [
      [`Waste Treatment`, `Aeration basins reduce BOD levels of municipal sewage before discharging water.`],
      [`Industrial Synthesis`, `Supercritical carbon dioxide is used as a green solvent, replacing toxic organic options.`],
    ],
  },
};

// ==================== CLASS 12 ====================

export const maths12Data: Record<number, ChapterContent> = {
  1:
  {
    title: `Applications of Matrices and Determinants`,
    definitions: [
      [`Singular Matrix`, `A square matrix A is singular if its determinant is zero, meaning |A| = 0. It does not possess a multiplicative inverse.`],
      [`Adjoint Matrix`, `The transpose of the cofactor matrix of a given square matrix A, denoted by adj(A).`],
      [`Rank of Matrix`, `The maximum number of linearly independent row or column vectors in matrix A, determined by reducing to row-echelon form.`],
    ],
    formulas: [
      `Inverse Formula: A^-1 = (1 / |A|) * adj(A)`,
      `Product Property: adj(AB) = adj(B) * adj(A)`,
      `System Consistency (Rouche-Capelli): Consistent if rank(A) = rank([A|B])`,
      `Cramer's Rule: x_i = Delta_i / Delta for Delta not zero`,
    ],
    examples: [
      { q: `Find the inverse of matrix A = [[2, -1], [5, -3]].`, ans: `Determinant |A| = 2(-3) - (-1)(5) = -6 + 5 = -1 (non-zero).\nCofactor matrix: C11=-3, C12=-5, C21=1, C22=2.\nAdjoint adj(A) = [[-3, 1], [-5, 2]].\nInverse A^-1 = (1/-1) * adj(A) = [[3, -1], [5, -2]].` },
    ],
    hots: [
      { q: `Investigate the consistency of the system: x + y = 3, 2x + 2y = 6.`, ans: `Coefficient matrix A = [[1, 1], [2, 2]], rank(A) = 1.\nAugmented matrix [A|B] = [[1, 1 | 3], [2, 2 | 6]].\nRow 2 -> Row 2 - 2 * Row 1 => [[1, 1 | 3], [0, 0 | 0]].\nRank of augmented matrix is 1. Since rank(A) = rank([A|B]) = 1 < 2 (variables), the system is consistent with infinitely many solutions.` },
    ],
    worksheet: [
      `State when a system of linear equations is inconsistent.`,
      `If A is a square matrix of order 3 and |A| = 5, find |adj(A)|.`,
      `Solve using Cramer's rule: 2x - y = 5, x + 3y = -1.`,
      `Reduce the matrix [[1, 2, -1], [3, 6, -3]] to row-echelon form and find its rank.`,
      `Prove that A * adj(A) = |A| * I.`,
    ],
    applications: [
      [`Cryptography`, `Matrix multiplication and inversion encode and decode secure communications via Hill Cipher models.`],
      [`Graphics Engineering`, `Linear transformation matrices map coordinate transformations (scale, rotate, translate) in rendering engines.`],
    ],
  },
  2:
  {
    title: `Complex Numbers`,
    definitions: [
      [`Complex Number`, `A number of the form z = x + iy, where x and y are real numbers and i = sqrt(-1) is the imaginary unit.`],
      [`Conjugate of Complex Number`, `The complex number z* = x - iy obtained by changing the sign of the imaginary part of z = x + iy.`],
      [`Argand Diagram`, `A geometric representation of complex numbers as points or position vectors in a Cartesian plane.`],
    ],
    formulas: [
      `Modulus: |z| = sqrt(x^2 + y^2)`,
      `Polar Form: z = r(cos(theta) + i*sin(theta)) where r = |z| and theta = Arg(z)`,
      `De Moivre Theorem: (cos(theta) + i*sin(theta))^n = cos(n*theta) + i*sin(n*theta)`,
      `Euler Form: z = r * e^(i*theta)`,
    ],
    examples: [
      { q: `Express 1 + i*sqrt(3) in polar form.`, ans: `Modulus r = sqrt(1^2 + (sqrt(3))^2) = sqrt(1 + 3) = 2.\nArgument theta = tan^-1(sqrt(3) / 1) = pi/3.\nPolar form: 2(cos(pi/3) + i*sin(pi/3)).` },
    ],
    hots: [
      { q: `Find the cube roots of unity and show they form an equilateral triangle in the Argand plane.`, ans: `Cube roots are 1, w = e^(i*2pi/3), w^2 = e^(i*4pi/3).\nThe points are (1,0), (-1/2, sqrt(3)/2), (-1/2, -sqrt(3)/2).\nDistances between these points are all equal to sqrt(3), proving they form an equilateral triangle.` },
    ],
    worksheet: [
      `Find the real and imaginary parts of (2 + 3i) / (1 - 2i).`,
      `State the geometric meaning of multiplying a complex number by i.`,
      `If z1 and z2 are two complex numbers, show that |z1 + z2| <= |z1| + |z2|.`,
      `Evaluate the value of i^100 + i^101 + i^102 + i^103.`,
      `Solve the complex quadratic equation: z^2 + z + 1 = 0.`,
    ],
    applications: [
      [`Electrical Grid Analysis`, `Alternating current impedance and voltages are analyzed as complex vectors, simplifying phase addition.`],
      [`Fractal Generation`, `Complex coordinates calculate Julia and Mandelbrot sets in structural chaos theory animations.`],
    ],
  },
  3:
  {
    title: `Theory of Equations`,
    definitions: [
      [`Polynomial Equation`, `An algebraic equation of the form a_n*x^n + ... + a_1*x + a_0 = 0, where coefficients are real or complex.`],
      [`Rational Root Theorem`, `If a rational number p/q in lowest terms is a root of a polynomial with integer coefficients, then p divides a_0 and q divides a_n.`],
      [`Descartes Rule of Signs`, `A technique to determine the maximum number of positive and negative real roots of a polynomial function.`],
    ],
    formulas: [
      `Vieta's (Quadratic): alpha + beta = -b/a | alpha * beta = c/a`,
      `Vieta's (Cubic): sum a_i = -b/a | sum a_i*a_j = c/a | a_1*a_2*a_3 = -d/a`,
      `Complex Conjugate Roots: If a + ib is a root, then a - ib is also a root (for real coefficients)`,
    ],
    examples: [
      { q: `Solve x^3 - 3x^2 - 10x + 24 = 0 given that one root is 2.`, ans: `Divide by (x - 2) using synthetic division.\nThe quotient is x^2 - x - 12 = (x - 4)(x + 3).\nTherefore, the roots are x = 2, 4, -3.` },
    ],
    hots: [
      { q: `Form a polynomial equation of lowest degree with rational coefficients having 2 + sqrt(3) and 3 - 2i as roots.`, ans: `Since coefficients are rational, conjugate roots must occur: 2 - sqrt(3) and 3 + 2i.\nFactors for quadratic 1: (x - (2+sqrt(3)))(x - (2-sqrt(3))) = x^2 - 4x + 1.\nFactors for quadratic 2: (x - (3-2i))(x - (3+2i)) = x^2 - 6x + 13.\nPolynomial is (x^2 - 4x + 1)(x^2 - 6x + 13) = x^4 - 10x^3 + 38x^2 - 46x + 13 = 0.` },
    ],
    worksheet: [
      `If alpha and beta are roots of x^2 - 5x + 6 = 0, find the value of 1/alpha + 1/beta.`,
      `Use Descartes' rule to analyze roots of x^5 - 2x^2 + 5 = 0.`,
      `Find the sum and product of roots for 3x^3 - 5x^2 + 2x - 7 = 0.`,
      `Form a quadratic equation with roots 3 + i.`,
      `Solve the equation: 2x^3 - 9x^2 + 10x - 3 = 0.`,
    ],
    applications: [
      [`Control Engineering`, `Polynomial roots evaluate pole placements, predicting mechanical control loop stability limits.`],
      [`Acoustic resonance`, `Theory of equations maps natural harmonic peak coordinates in audio chambers.`],
    ],
  },
  4:
  {
    title: `Inverse Trigonometric Functions`,
    definitions: [
      [`Inverse Sine Function`, `The inverse function of the restricted sine function y = sin x on [-pi/2, pi/2], denoted by arcsin x or sin^-1 x.`],
      [`Principal Value Branch`, `The standard restricted range of an inverse trigonometric function which yields a unique single-valued output.`],
      [`Inverse Tangent Function`, `The inverse of the tangent function restricted to (-pi/2, pi/2), mapping all real numbers to bounded angles.`],
    ],
    formulas: [
      `sin^-1(x) + cos^-1(x) = pi / 2 for x in [-1, 1]`,
      `tan^-1(x) + tan^-1(y) = tan^-1((x + y) / (1 - xy)) for xy < 1`,
      `Property: sin(sin^-1 x) = x | sin^-1(sin x) = x (for x in standard range)`,
    ],
    examples: [
      { q: `Find the principal value of sin^-1(-1/2).`, ans: `Let sin^-1(-1/2) = theta. Then sin(theta) = -1/2.\nStandard range for sin^-1 is [-pi/2, pi/2].\nSince sin(-pi/6) = -1/2, principal value is -pi/6.` },
    ],
    hots: [
      { q: `Solve: tan^-1(2x) + tan^-1(3x) = pi/4.`, ans: `Apply tan^-1 sum formula: tan^-1((2x + 3x) / (1 - 6x^2)) = pi/4.\n5x / (1 - 6x^2) = tan(pi/4) = 1 => 5x = 1 - 6x^2 => 6x^2 + 5x - 1 = 0.\n(6x - 1)(x + 1) = 0 => x = 1/6 or x = -1.\nSince x = -1 makes LHS negative, the only valid solution is x = 1/6.` },
    ],
    worksheet: [
      `State domain and range of y = cos^-1(x).`,
      `Evaluate: cos^-1(cos(7pi/6)).`,
      `Prove that sin^-1(x) = cosec^-1(1/x) for |x| >= 1.`,
      `Find value of tan(cos^-1(4/5)).`,
      `Solve the equation: sin^-1(x) + sin^-1(2x) = pi/3.`,
    ],
    applications: [
      [`Satellite Navigation`, `Position triangulation coordinates utilize inverse tangent functions to resolve latitude angles.`],
      [`Robotics`, `Robotic joints calculate rotation angles using inverse trigonometric functions to place claws precisely.`],
    ],
  },
  5:
  {
    title: `Two-Dimensional Analytical Geometry-II`,
    definitions: [
      [`Parabola`, `The locus of a point which moves such that its distance from a fixed point (focus) equals its distance from a line (directrix).`],
      [`Ellipse`, `The locus of a point whose sum of distances from two fixed points (foci) is a constant equal to major axis length.`],
      [`Asymptotes of Hyperbola`, `A pair of straight lines passing through the center of a hyperbola that the curve approaches infinitely close but never touches.`],
    ],
    formulas: [
      `Parabola (y^2 = 4ax): Focus (a, 0) | Directrix x = -a`,
      `Ellipse (x^2/a^2 + y^2/b^2 = 1): Foci (+-ae, 0) | Eccentricity e = sqrt(1 - b^2/a^2)`,
      `Hyperbola (x^2/a^2 - y^2/b^2 = 1): Foci (+-ae, 0) | Eccentricity e = sqrt(1 + b^2/a^2)`,
      `Tangent condition: For y = mx + c to touch y^2 = 4ax, c = a/m`,
    ],
    examples: [
      { q: `Find the coordinates of focus and length of latus rectum of parabola y^2 = 12x.`, ans: `Comparing with y^2 = 4ax, 4a = 12 => a = 3.\nFocus: (a, 0) = (3, 0).\nLength of latus rectum: 4a = 12.` },
    ],
    hots: [
      { q: `Find equation of tangent and normal to the ellipse x^2/16 + y^2/9 = 1 at point (2, 3*sqrt(3)/2).`, ans: `Equation of tangent: x*x1/a^2 + y*y1/b^2 = 1.\nSubstitute (x1, y1): 2x/16 + [y * 3*sqrt(3)/2]/9 = 1 => x/8 + sqrt(3)y/6 = 1 => 3x + 4*sqrt(3)y - 24 = 0.\nNormal slope is perpendicular to tangent: normal eq is 4*sqrt(3)x - 3y - 5*sqrt(3) = 0.` },
    ],
    worksheet: [
      `Find eccentricity of the ellipse 9x^2 + 25y^2 = 225.`,
      `Write standard equation of hyperbola with foci (+-5, 0) and transverse axis length 8.`,
      `State the equation of asymptotes of hyperbola x^2/a^2 - y^2/b^2 = 1.`,
      `Find length of latus rectum of ellipse x^2/9 + y^2/4 = 1.`,
      `Determine the condition for line y = mx + c to touch ellipse x^2/a^2 + y^2/b^2 = 1.`,
    ],
    applications: [
      [`Acoustic Whispering Galleries`, `Elliptical ceilings reflect sound waves from one focal point directly to the opposite focal point.`],
      [`Satellite Dish design`, `Parabolic reflectors converge parallel incoming microwave signals into a central focus receiver.`],
    ],
  },
  6:
  {
    title: `Vector Algebra`,
    definitions: [
      [`Scalar Triple Product`, `The dot product of a vector with the cross product of two other vectors, denoted by [a, b, c], representing parallelepiped volume.`],
      [`Vector Triple Product`, `The cross product of a vector with the cross product of two other vectors, yielding a vector perpendicular to both vectors.`],
      [`Skew Lines`, `Lines in three-dimensional space that are not parallel and do not intersect, lying on different planes.`],
    ],
    formulas: [
      `Scalar Triple Product: [a, b, c] = a . (b x c) | [a, b, c] = 0 means coplanar`,
      `Vector Triple Product Expansion: a x (b x c) = (a . c)b - (a . b)c`,
      `Shortest distance (skew lines): d = |(a2 - a1) . (u x v)| / |u x v|`,
      `Plane Equation: r . n = d`,
    ],
    examples: [
      { q: `Find volume of a parallelepiped whose coterminous edges are i + j, 2i - k, and j + k.`, ans: `a = i+j, b = 2i-k, c = j+k.\n[a, b, c] = det([[1, 1, 0], [2, 0, -1], [0, 1, 1]]) = 1(0 - (-1)) - 1(2 - 0) + 0 = 1 - 2 = -1.\nVolume = | -1 | = 1 cubic unit.` },
    ],
    hots: [
      { q: `Find the vector and cartesian equations of the plane passing through points (2, 2, 1) and (9, 3, 6) and perpendicular to plane 2x + 6y + 6z = 9.`, ans: `Normal vector n1 of target plane must be perpendicular to plane vector (7, 1, 5) and normal of given plane (2, 6, 6).\nn1 = (7, 1, 5) x (2, 6, 6) = (-24, -32, 40) proportional to (3, 4, -5).\nPlane passing through (2, 2, 1): 3(x-2) + 4(y-2) - 5(z-1) = 0 => 3x + 4y - 5z = 9.` },
    ],
    worksheet: [
      `Find shortest distance between parallel lines r = a1 + t*u and r = a2 + s*u.`,
      `Evaluate coplanarity of vectors: 2i - j + k, i + 2j - 3k, 3i + j - 2k.`,
      `Write down vector equation of a line passing through (1, 2, 3) in direction of 2i - j + 2k.`,
      `Define vector triple product.`,
      `Find angle between the planes r . (i + j + k) = 5 and r . (2i - j + k) = 3.`,
    ],
    applications: [
      [`Aviation Traffic`, `Collision avoidance algorithms calculate the shortest distance between plane path lines using skew line formulas.`],
      [`3D Mesh Rendering`, `Illumination angles are resolved by calculating plane normal vectors on face meshes.`],
    ],
  },
  7:
  {
    title: `Applications of Differential Calculus`,
    definitions: [
      [`Mean Value Theorem`, `If a function is continuous on [a,b] and differentiable on (a,b), there exists a point c where tangent equals chord slope.`],
      [`Point of Inflection`, `A coordinate point on a curve where the concavity changes from concave upwards to concave downwards, or vice versa.`],
      [`Local Extrema`, `Points in the domain where a function achieves its maximum or minimum value relative to neighboring values.`],
    ],
    formulas: [
      `Rolle's: f(a) = f(b) => f'(c) = 0 for c in (a, b)`,
      `Lagrange MVT: f'(c) = (f(b) - f(a)) / (b - a)`,
      `Local Maxima: f'(c) = 0 and f''(c) < 0 | Minima: f'(c) = 0 and f''(c) > 0`,
      `Inflection Condition: f''(c) = 0 and f'''(c) != 0`,
    ],
    examples: [
      { q: `Find local extrema of f(x) = x^3 - 3x + 5.`, ans: `f'(x) = 3x^2 - 3 = 3(x-1)(x+1) = 0 => x = 1, -1.\nf''(x) = 6x.\nAt x = 1: f''(1) = 6 > 0 => Local Minima (f(1) = 3).\nAt x = -1: f''(-1) = -6 < 0 => Local Maxima (f(-1) = 7).` },
    ],
    hots: [
      { q: `Verify Rolle's Theorem for f(x) = x^2 - 4x + 3 on the interval [1, 3].`, ans: `1) Continuous on [1, 3] (polynomial). 2) Differentiable on (1, 3) with f'(x) = 2x - 4.\n3) f(1) = 1 - 4 + 3 = 0, f(3) = 9 - 12 + 3 = 0. f(1)=f(3).\nRolle's condition: f'(c) = 2c - 4 = 0 => c = 2. Since 2 lies in (1, 3), Rolle's theorem is verified.` },
    ],
    worksheet: [
      `State Rolle's Theorem and Lagrange's Mean Value Theorem.`,
      `Find the intervals of monotonicity for f(x) = 2x^3 - 9x^2 + 12x.`,
      `Determine the concavity of f(x) = e^x.`,
      `Find the point of inflection for y = x^3.`,
      `Find two numbers whose sum is 10 and whose product is maximum.`,
    ],
    applications: [
      [`Financial Economics`, `Profit margins are maximized by differentiating revenue equations to locate maximum peaks.`],
      [`Aerospace Layouts`, `Aircraft skin curvatures are mapped using inflection points to ensure smooth airflows.`],
    ],
  },
  8:
  {
    title: `Differentials and Partial Derivatives`,
    definitions: [
      [`Differential`, `The linear approximation of the change in a dependent variable, denoted dy = f'(x) * dx.`],
      [`Homogeneous Function`, `A function f(x,y) where f(tx, ty) = t^n * f(x,y) for all real t, where n is the degree of the function.`],
      [`Partial Derivative`, `The derivative of a multi-variable function with respect to one variable while holding all other variables constant.`],
    ],
    formulas: [
      `Linear Approximation: L(x) = f(x0) + f'(x0) * (x - x0)`,
      `Euler's Theorem: x * df/dx + y * df/dy = n * f`,
      `Total Differential: df = (df/dx)*dx + (df/dy)*dy`,
    ],
    examples: [
      { q: `If u = x^2 * y + y^3, find du/dx and du/dy.`, ans: `du/dx = d/dx(x^2*y) + 0 = 2xy.\ndu/dy = x^2 + 3y^2.` },
    ],
    hots: [
      { q: `Verify Euler's Theorem for u = sin^-1(x / y).`, ans: `u(tx, ty) = sin^-1(tx/ty) = sin^-1(x/y) = t^0 * u. Degree n = 0.\ndu/dx = (1 / sqrt(1 - x^2/y^2)) * (1/y) = 1 / sqrt(y^2 - x^2).\ndu/dy = (1 / sqrt(1 - x^2/y^2)) * (-x/y^2) = -x / (y * sqrt(y^2 - x^2)).\nx*du/dx + y*du/dy = x / sqrt(y^2-x^2) - x / sqrt(y^2-x^2) = 0 = 0*u. Verified.` },
    ],
    worksheet: [
      `Find differential dy for y = x^4 - 2x^2.`,
      `Use linear approximation to estimate the value of sqrt(26). (Take x0 = 25).`,
      `State Euler's Theorem for homogeneous functions.`,
      `If u = ln(x^2 + y^2), prove that x*du/dx + y*du/dy = 2.`,
      `Evaluate total differential of z = x^2 * e^y.`,
    ],
    applications: [
      [`Thermal Engineering`, `Stress expansion margins in steam pipes are approximated using total differentials.`],
      [`Machine Learning`, `Backpropagation updates weight parameters via multi-variable chain rule partial derivatives.`],
    ],
  },
  9:
  {
    title: `Applications of Integration`,
    definitions: [
      [`Definite Integral Area`, `The area bounded by a function curve y=f(x), the x-axis, and the ordinates x=a and x=b.`],
      [`Volume of Revolution`, `The volume of a solid generated by rotating a two-dimensional curve about a coordinate axis.`],
      [`Gamma Function`, `An extension of the factorial function to complex and real numbers, defined by an improper integral.`],
    ],
    formulas: [
      `Area (along x): A = Integral_{a}^{b} y dx | Area (along y): A = Integral_{c}^{d} x dy`,
      `Volume (x rotation): V = pi * Integral_{a}^{b} y^2 dx`,
      `Gamma Integral: Gamma(n) = Integral_{0}^{inf} x^(n-1) * e^-x dx = (n-1)!`,
    ],
    examples: [
      { q: `Find area of the region bounded by y^2 = 4x, the x-axis, and lines x=1, x=4.`, ans: `Area = Integral_{1}^{4} 2*sqrt(x) dx = 2 * [(x^1.5)/1.5]_{1}^{4} = (4/3) * (8 - 1) = 28/3 square units.` },
    ],
    hots: [
      { q: `Find the area of the region enclosed between the parabola y^2 = 4ax and the line y = mx.`, ans: `Intersection: (mx)^2 = 4ax => m^2*x^2 - 4ax = 0 => x = 4a/m^2. Limits are x=0 to 4a/m^2.\nArea = Integral [2*sqrt(a)*sqrt(x) - mx] dx = [2*sqrt(a)*(x^1.5)/1.5 - 0.5*m*x^2]_{0}^{4a/m^2}.\nSubstituting limits yields: 8*a^2 / (3*m^3) square units.` },
    ],
    worksheet: [
      `Evaluate definite integral of sin^3(x) dx from 0 to pi/2 using reduction formula.`,
      `Find volume of the solid generated by rotating circle x^2 + y^2 = r^2 about x-axis.`,
      `Calculate area of ellipse x^2/a^2 + y^2/b^2 = 1 using integration.`,
      `Evaluate Gamma(5).`,
      `Find area bounded by y = x^2 and line y = 4.`,
    ],
    applications: [
      [`Marine Architecture`, `Integrals evaluate the displacement volumes of ship hulls to ensure buoyancy boundaries.`],
      [`Structural Design`, `Concrete dome construction volumes are calculated using rotation integration rules.`],
    ],
  },
  10:
  {
    title: `Ordinary Differential Equations`,
    definitions: [
      [`Order of ODE`, `The degree of the highest derivative present in the given differential equation.`],
      [`Degree of ODE`, `The power of the highest derivative when the equation is expressed as a polynomial in derivatives.`],
      [`Integrating Factor`, `A function multiplied to a non-separable differential equation to make it integrable.`],
    ],
    formulas: [
      `Linear first-order: dy/dx + P*y = Q | IF = e^(Integral P dx)`,
      `Linear solution: y * IF = Integral (Q * IF) dx + C`,
      `Homogeneous substitution: y = v * x => dy/dx = v + x * dv/dx`,
    ],
    examples: [
      { q: `Solve the differential equation dy/dx + y = e^-x.`, ans: `Here P = 1, Q = e^-x. Integrating factor IF = e^(Integral 1 dx) = e^x.\nSolution: y * e^x = Integral (e^-x * e^x) dx = Integral 1 dx = x + C.\ny = (x + C) * e^-x.` },
    ],
    hots: [
      { q: `Solve: (x^2 + y^2)dx - 2xy dy = 0.`, ans: `dy/dx = (x^2 + y^2)/2xy. Homogeneous. Let y = vx => dy/dx = v + x*dv/dx.\nv + x*dv/dx = (x^2 + v^2*x^2)/2v*x^2 = (1 + v^2)/2v.\nx*dv/dx = (1 + v^2)/2v - v = (1 - v^2)/2v => [2v / (1 - v^2)] dv = dx / x.\nIntegrate: -ln(1 - v^2) = ln(x) + C => x(1 - v^2) = K => x^2 - y^2 = Kx.` },
    ],
    worksheet: [
      `Find the order and degree of d^2y/dx^2 + (dy/dx)^3 = sin(x).`,
      `Form the differential equation corresponding to y^2 = 4ax by eliminating a.`,
      `Solve by variable separation: dy/dx = (1 + y^2)/(1 + x^2).`,
      `Solve the linear ODE: dy/dx + y*cot(x) = 2*cos(x).`,
      `A culture grows at rate proportional to size. Formulate the differential equation.`,
    ],
    applications: [
      [`Nuclear Physics`, `Radioactive decay rates are modeled using first-order linear differential equations.`],
      [`Mechanical Engineering`, `Suspension spring oscillations are modeled as second-order linear differential equations.`],
    ],
  },
  11:
  {
    title: `Probability Distributions`,
    definitions: [
      [`Random Variable`, `A real-valued function defined over a probability sample space, mapping outcomes to real numbers.`],
      [`Probability Density Function`, `A function f(x) for a continuous random variable whose integral over an interval yields event probability.`],
      [`Mathematical Expectation`, `The weighted average of all possible values of a random variable, representing the mean.`],
    ],
    formulas: [
      `Expectation (Discrete): E(X) = sum x_i * P(x_i) | Variance: Var(X) = E(X^2) - [E(X)]^2`,
      `Binomial Distribution: P(X = k) = nCk * p^k * q^(n-k)`,
      `Normal density: f(x) = (1 / (sigma * sqrt(2*pi))) * e^(-(x-mu)^2 / (2*sigma^2))`,
    ],
    examples: [
      { q: `If X is a random variable with E(X)=2 and E(X^2)=6, find the variance.`, ans: `Var(X) = E(X^2) - [E(X)]^2 = 6 - (2)^2 = 6 - 4 = 2.` },
    ],
    hots: [
      { q: `If 10% of bolts produced by a machine are defective, find the probability that out of 5 bolts chosen at random, exactly 2 are defective.`, ans: `Binomial: n = 5, p = 0.1, q = 0.9. We want P(X=2).\nP(X=2) = 5C2 * (0.1)^2 * (0.9)^3 = 10 * 0.01 * 0.729 = 0.0729.` },
    ],
    worksheet: [
      `A random variable has PMF P(x) = kx for x=1,2,3. Find value of k.`,
      `State the properties of a Probability Density Function.`,
      `Find the mean and variance of a binomial distribution with n=100, p=0.4.`,
      `Explain standard normal distribution properties.`,
      `Define discrete and continuous random variables with examples.`,
    ],
    applications: [
      [`Quality Assurance`, `Industrial batch lines sample defect counts using binomial distribution models.`],
      [`Traffic Management`, `Server network packet arrivals are modeled using Poisson probability distributions.`],
    ],
  },
  12:
  {
    title: `Discrete Mathematics`,
    definitions: [
      [`Binary Operation`, `A rule * on set A mapping every ordered pair (a,b) to a unique element c in A, closed under *.`],
      [`Tautology`, `A composite statement or logical proposition that is always true for all truth values of its constituents.`],
      [`Monoid`, `An algebraic structure consisting of a set closed under a binary operation that is associative and contains an identity element.`],
    ],
    formulas: [
      `Closure Property: a * b in A for all a, b in A`,
      `Logical Implication: p -> q is equivalent to (~p v q)`,
      `De Morgan's logical laws: ~(p v q) = ~p n ~q | ~(p n q) = ~p v ~q`,
    ],
    examples: [
      { q: `Check closure of multiplication on set A = {-1, 1}.`, ans: `(-1)*(-1)=1, (-1)*1=-1, 1*1=1. All results are in A. Closed.` },
    ],
    hots: [
      { q: `Construct a truth table to show that ~(p -> q) is logically equivalent to p n ~q.`, ans: `Columns: p, q, ~q, p->q, ~(p->q), p n ~q.\nFor (T,T): p->q=T, ~(p->q)=F, p n ~q=F.\nFor (T,F): p->q=F, ~(p->q)=T, p n ~q=T.\nFor (F,T): p->q=T, ~(p->q)=F, p n ~q=F.\nFor (F,F): p->q=T, ~(p->q)=F, p n ~q=F.\nTruth values match, showing logical equivalence.` },
    ],
    worksheet: [
      `Define binary operation and write its closure condition.`,
      `Show that addition is not a binary operation on odd numbers.`,
      `Construct truth table for p v ~p (Tautology).`,
      `State what is a contradictions statement in logical structures.`,
      `Test associativity of operation a * b = a + b + ab on integers.`,
    ],
    applications: [
      [`Logic Circuits`, `Microprocessor CPU logic gates implement binary arithmetic via Boolean truth tables.`],
      [`Compiler Verification`, `Compiler logical expressions are optimized using tautology equivalence rules.`],
    ],
  },
};

export const physics12Data: Record<number, ChapterContent> = {
  1:
  {
    title: `Electrostatics`,
    definitions: [
      [`Coulomb Law`, `The electrostatic force between two point charges is proportional to the product of charges and inversely to distance squared.`],
      [`Electric Field`, `The force experienced by a unit positive test charge placed at a point in space around a source charge.`],
      [`Electric Dipole`, `A system of two equal and opposite point charges separated by a small distance.`],
    ],
    formulas: [
      `Coulomb Force: F = (1 / (4*pi*epsilon_0)) * (q1 * q2) / r^2`,
      `Electric Field: E = F / q`,
      `Dipole Moment: p = q * 2a`,
      `Electric Potential: V = (1 / (4*pi*epsilon_0)) * q / r`,
      `Capacitance: C = Q / V | Parallel Plate: C = epsilon_0 * A / d`,
    ],
    examples: [
      { q: `Find the force between two charges of 2 micro-coulombs separated by 3 meters in vacuum.`, ans: `Apply Coulomb's law: F = (9 * 10^9) * (2*10^-6 * 2*10^-6) / 3^2.\nF = (9 * 10^9) * (4 * 10^-12) / 9 = 4 * 10^-3 Newtons.` },
    ],
    hots: [
      { q: `Show that the electric field at an axial point of a dipole is twice that at an equatorial point at the same large distance.`, ans: `Axial Field: E_ax = (1/(4*pi*eps)) * 2p/r^3. Equatorial Field: E_eq = (1/(4*pi*eps)) * p/r^3.\nComparing both yields E_ax = 2 * E_eq, demonstrating axial fields drop less rapidly.` },
    ],
    worksheet: [
      `State Gauss's Law in electrostatics.`,
      `What is an equipotential surface? State its properties.`,
      `Calculate the energy stored in a 10 microfarad capacitor charged to 100V.`,
      `Define dielectric constant of a medium.`,
      `Explain the working principle of a Van de Graaff Generator.`,
    ],
    applications: [
      [`Inkjet Printers`, `Deflection plates guide charged ink droplets to precise paper coordinates using electrostatic fields.`],
      [`Air Filter Systems`, `Electrostatic precipitators charge and trap smoke particles, reducing industrial factory pollution emissions.`],
    ],
  },
  2:
  {
    title: `Current Electricity`,
    definitions: [
      [`Drift Velocity`, `The average velocity acquired by free electrons in a conductor under the influence of an electric field.`],
      [`Temperature Coefficient of Resistance`, `The fractional change in resistance of a conductor per unit change in temperature.`],
      [`Superconductivity`, `The property of certain materials to conduct electricity with zero resistance below a transition temperature.`],
    ],
    formulas: [
      `Current: I = n * A * e * v_d | Current Density: J = I / A = sigma * E`,
      `Ohm's Law: V = I * R | Resistance: R = rho * l / A`,
      `Temperature: R_T = R_0 * (1 + alpha * delta_T)`,
      `Kirchhoff's: Sum I = 0 (Junction) | Sum I*R = Sum E (Loop)`,
    ],
    examples: [
      { q: `Find resistance of a copper wire of length 10m and cross-sectional area 1 mm^2. (Resistivity = 1.7*10^-8 ohm-m)`, ans: `Area = 10^-6 m^2.\nR = rho * l / A = 1.7*10^-8 * 10 / 10^-6 = 1.7*10^-1 = 0.17 ohms.` },
    ],
    hots: [
      { q: `Derive the balance condition of a Wheatstone Bridge using Kirchhoff's rules.`, ans: `Bridge has resistors P, Q, R, S. Let galvanometer current be Ig.\nAt node B: I1 - Ig - I3 = 0. At node D: I2 + Ig - I4 = 0.\nLoop ABDA: I1*P + Ig*G - I2*R = 0. Loop BCDB: I3*Q - I4*S - Ig*G = 0.\nAt balance Ig = 0 => I1 = I3 and I2 = I4.\nEquations yield I1*P = I2*R and I1*Q = I2*S. Divide both to get P/Q = R/S.` },
    ],
    worksheet: [
      `Define drift velocity and write its expression.`,
      `State Kirchhoff's junction rule and loop rule.`,
      `Explain the working of a Potentiometer for comparing EMFs.`,
      `List the differences between primary and secondary electric cells.`,
      `State Joule's law of heating.`,
    ],
    applications: [
      [`Sensors`, `Potentiometric sensors measure micro-voltages to track cardiac activity monitors.`],
      [`Industrial safety`, `Fuses melt using Joule heating bounds to break grids before fire hazards occur.`],
    ],
  },
  3:
  {
    title: `Magnetism and Magnetic Effects`,
    definitions: [
      [`Magnetic Dipole Moment`, `The product of pole strength and magnetic length of a magnet, representing torque reactions.`],
      [`Magnetic Hysteresis`, `The lagging of magnetic induction behind the magnetizing field in a ferromagnetic material.`],
      [`Gyromagnetic Ratio`, `The ratio of the magnetic dipole moment to the angular momentum of an electron orbiting a nucleus.`],
    ],
    formulas: [
      `Biot-Savart: dB = (mu_0 / 4*pi) * I * dl x r_hat / r^2`,
      `Ampere's Law: Closed integral B . dl = mu_0 * I_enclosed`,
      `Lorentz Force: F = q * (v x B) | Torque (loop): tau = N * I * A * B * sin(theta)`,
      `Magnetic Field (solenoid): B = mu_0 * n * I`,
    ],
    examples: [
      { q: `Calculate magnetic field at center of circular loop of radius 10cm carrying 5A current. (mu_0 = 4*pi*10^-7)`, ans: `B = mu_0 * I / (2 * R) = 4*pi*10^-7 * 5 / (2 * 0.1) = 2*pi*10^-7 * 50 = 3.14 * 10^-5 Tesla.` },
    ],
    hots: [
      { q: `Show how a galvanometer can be converted into: (1) an Ammeter, and (2) a Voltmeter.`, ans: `(1) Ammeter: Connect a very low shunt resistor S in parallel with galvanometer. S = Ig*G / (I - Ig).\n(2) Voltmeter: Connect a high resistor R in series with galvanometer. R = V/Ig - G.` },
    ],
    worksheet: [
      `State Biot-Savart Law in vector form.`,
      `Compare dia, para, and ferro-magnetic materials.`,
      `State Ampere's circuital law.`,
      `What is Cyclotron? Explain resonance condition.`,
      `Calculate force between two parallel current-carrying conductors.`,
    ],
    applications: [
      [`Diagnostic Systems`, `MRI scanners use superconducting solenoids to align hydrogen nuclei in body tissue scans.`],
      [`Electric Motors`, `Industrial motor rotors spin using magnetic torque forces acting on coil loops.`],
    ],
  },
  4:
  {
    title: `Electromagnetic Induction and Alternating Current`,
    definitions: [
      [`Electromagnetic Induction`, `The generation of an electromotive force (EMF) across a conductor due to changing magnetic flux.`],
      [`Self-Induction`, `The property of a coil by which an opposing EMF is induced when the current through it changes.`],
      [`LCR Series Resonance`, `The state in an AC circuit where inductive reactance equals capacitive reactance, yielding minimum impedance.`],
    ],
    formulas: [
      `Faraday's Law: e = -d(Phi_B)/dt | Mutual Inductance: e2 = -M * dI1/dt`,
      `Impedance (LCR): Z = sqrt(R^2 + (X_L - X_C)^2) where X_L = omega*L, X_C = 1/(omega*C)`,
      `Resonant Frequency: f_r = 1 / (2 * pi * sqrt(L * C))`,
      `Transformer: Vs / Vp = Ns / Np = Ip / Is`,
    ],
    examples: [
      { q: `Find resonant frequency of a circuit containing L=2H, C=8 microfarads.`, ans: `f_r = 1 / (2 * pi * sqrt(2 * 8*10^-6)) = 1 / (2 * pi * sqrt(16*10^-6)) = 1 / (2 * pi * 4*10^-3) = 1000 / (8*pi) = 39.8 Hz.` },
    ],
    hots: [
      { q: `Explain the working principle and energy losses of an electrical Transformer.`, ans: `Works on mutual induction. Energy losses are: (1) Copper loss (heating), (2) Iron loss (eddy currents in core), (3) Hysteresis loss (magnetizing cycles), (4) Flux leakage. Addressed by laminating cores.` },
    ],
    worksheet: [
      `State Lenz's Law and show it is a consequence of energy conservation.`,
      `Define self-inductance and mutual inductance.`,
      `Describe the root mean square (RMS) value of alternating current.`,
      `What is Q-factor of a resonant LCR circuit?`,
      `Draw phasor diagram representing AC circuit with pure capacitor.`,
    ],
    applications: [
      [`Power Distribution`, `Step-up transformers raise voltages to 400kV, reducing heat losses over long grids.`],
      [`Wireless Charging`, `Inductive chargers transfer electric power across phone pads using mutual induction loops.`],
    ],
  },
  5:
  {
    title: `Electromagnetic Waves`,
    definitions: [
      [`Displacement Current`, `A fictitious current defined in terms of changing electric displacement field, satisfying Maxwell-Ampere law.`],
      [`Electromagnetic Wave`, `A transverse wave of oscillating electric and magnetic fields propagating through space at speed of light.`],
      [`Poynting Vector`, `A vector representing the directional energy flux density of an electromagnetic wave, denoted by S.`],
    ],
    formulas: [
      `Displacement Current: I_d = epsilon_0 * d(Phi_E)/dt`,
      `Wave Speed: c = 1 / sqrt(mu_0 * epsilon_0) = E_0 / B_0`,
      `Poynting Vector: S = (1 / mu_0) * (E x B)`,
    ],
    examples: [
      { q: `If electric field amplitude is 300 V/m, calculate magnetic field amplitude of EM wave.`, ans: `B_0 = E_0 / c = 300 / 3*10^8 = 10^-6 Tesla = 1 micro-Tesla.` },
    ],
    hots: [
      { q: `Write down Maxwell's four equations representing electromagnetic fields in vacuum.`, ans: `(1) Gauss Law (Electric): Closed integral E . dA = Q / eps_0.\n(2) Gauss Law (Magnetic): Closed integral B . dA = 0.\n(3) Faraday Law: Closed integral E . dl = -d(Phi_B)/dt.\n(4) Ampere-Maxwell Law: Closed integral B . dl = mu_0*I + mu_0*eps_0*d(Phi_E)/dt.` },
    ],
    worksheet: [
      `Explain what displacement current is and why it was introduced.`,
      `List three properties of electromagnetic waves.`,
      `Describe the electromagnetic spectrum divisions in order of frequency.`,
      `What are the uses of infrared waves and ultraviolet rays?`,
      `Show that EM waves are transverse in nature.`,
    ],
    applications: [
      [`Satellite Link`, `Microwaves propagate straight through ionosphere clouds to link satellite payloads.`],
      [`Medical diagnostics`, `X-ray wavelengths pass through tissue layers to image skeletal structures.`],
    ],
  },
  6:
  {
    title: `Ray Optics`,
    definitions: [
      [`Refractive Index`, `The ratio of the speed of light in a vacuum to the speed of light in a given medium.`],
      [`Total Internal Reflection`, `The complete reflection of a light ray back into a denser medium when angle of incidence exceeds critical angle.`],
      [`Power of a Lens`, `The measure of convergence or divergence of light rays by a lens, equal to reciprocal of focal length in meters.`],
    ],
    formulas: [
      `Snell's Law: n1 * sin(i) = n2 * sin(r) | Critical Angle: sin(i_c) = n2 / n1`,
      `Lens Maker's Formula: 1/f = (n - 1) * (1/R1 - 1/R2)`,
      `Prism Formula: n = sin((A + D)/2) / sin(A/2) (D = minimum deviation)`,
      `Mirror Equation: 1/v + 1/u = 1/f | Lens Equation: 1/v - 1/u = 1/f`,
    ],
    examples: [
      { q: `Find focal length of a lens of power +2.5 Diopters.`, ans: `P = 1 / f => f = 1 / P = 1 / 2.5 = 0.4 meters = 40 cm.` },
    ],
    hots: [
      { q: `Derive the Lens Maker's Formula for a thin double convex lens.`, ans: `For refraction at 1st boundary: n2/v1 - n1/u = (n2-n1)/R1.\nFor refraction at 2nd boundary: n1/v - n2/v1 = (n1-n2)/R2.\nAdding both equations: n1(1/v - 1/u) = (n2-n1)(1/R1 - 1/R2).\nSubstitute 1/v - 1/u = 1/f and simplify to get 1/f = (n - 1)(1/R1 - 1/R2).` },
    ],
    worksheet: [
      `State the conditions for total internal reflection to occur.`,
      `Explain the working of an Optical Fiber.`,
      `Find the critical angle for glass (n=1.5) with respect to air.`,
      `Write the mirror formula and state signs conventions.`,
      `Explain refractive index deviation in a prism.`,
    ],
    applications: [
      [`Telecommunications`, `Optic fiber cables carry high speed internet backbones using total internal reflection loops.`],
      [`Ophthalmic design`, `Convex and concave eyeglasses correct focus errors on retina planes.`],
    ],
  },
  7:
  {
    title: `Wave Optics`,
    definitions: [
      [`Wavefront`, `The locus of all points in a medium that oscillate in the same phase configuration.`],
      [`Coherent Sources`, `Two sources of light that emit waves having identical frequency, wavelength, and constant phase difference.`],
      [`Brewster Law`, `The tangent of the polarising angle is equal to the refractive index of the medium (tan(i_p) = n).`],
    ],
    formulas: [
      `Young Fringe Width: beta = D * lambda / d`,
      `Constructive: Path difference = n * lambda | Destructive: = (2n-1) * lambda / 2`,
      `Malus's Law: I = I_0 * cos^2(theta)`,
      `Single Slit Minima: d * sin(theta) = n * lambda`,
    ],
    examples: [
      { q: `In double slit, fringe width is 2mm. If screen distance D is doubled and slit spacing d is halved, find new width.`, ans: `beta' = D' * lambda / d' = (2*D) * lambda / (0.5*d) = 4 * beta.\nNew width = 4 * 2mm = 8 mm.` },
    ],
    hots: [
      { q: `Derive the expression for fringe width in Young's Double Slit Experiment.`, ans: `Path difference delta = S2P - S1P = x*d / D.\nFor constructive maxima: delta = n * lambda => x*d / D = n * lambda => x_n = n * D * lambda / d.\nFringe width beta = x_n - x_(n-1) = D * lambda / d.` },
    ],
    worksheet: [
      `State Huygens' Principle of wave propagation.`,
      `Differentiate between Fresnel and Fraunhofer diffractions.`,
      `Explain polarization of light waves.`,
      `State Brewster's Law and prove polarized rays are perpendicular to refracted rays.`,
      `Explain thin film interference coloring effects.`,
    ],
    applications: [
      [`Anti-reflective Coatings`, `Thin dielectric layers neutralize reflections on telescope lenses using destructive interference.`],
      [`Glare Protection`, `Polarized sunglasses block horizontally oriented glares reflecting off water surfaces.`],
    ],
  },
  8:
  {
    title: `Dual Nature of Radiation and Matter`,
    definitions: [
      [`Work Function`, `The minimum energy required to eject an electron from a metal surface, denoted by phi_0.`],
      [`Stopping Potential`, `The negative potential applied to the collector plate that reduces photoelectric current to zero.`],
      [`De Broglie Wave`, `A wave associated with a moving material particle, representing the wave nature of matter.`],
    ],
    formulas: [
      `Photon Energy: E = h * f = h * c / lambda`,
      `Einstein Photoelectric: h * f = phi_0 + K_max = h * f_0 + e * V_0`,
      `de Broglie Wavelength: lambda = h / p = h / (m * v) = h / sqrt(2 * m * e * V)`,
    ],
    examples: [
      { q: `Calculate energy of a photon of wavelength 600nm. (h = 6.63*10^-34, c = 3*10^8)`, ans: `E = h*c / lambda = 6.63*10^-34 * 3*10^8 / 600*10^-9 = 19.89*10^-26 / 6*10^-7 = 3.3 * 10^-19 Joules.` },
    ],
    hots: [
      { q: `List the experimental observations of the photoelectric effect and explain how wave theory failed to explain them.`, ans: `Observations: (1) Instantaneous emission, (2) Threshold frequency requirement, (3) KE depends on frequency, not intensity.\nWave failure: Wave theory predicts energy absorbs continuously; thus, intense light should eject electrons regardless of frequency after a delay, contradicting observations.` },
    ],
    worksheet: [
      `Define work function and stopping potential.`,
      `State Einstein's photoelectric equation.`,
      `Find de Broglie wavelength of an electron accelerated through 100V.`,
      `Describe Davisson-Germer experiment setup and significance.`,
      `List three properties of photon packets.`,
    ],
    applications: [
      [`Solar Energy`, `Photovoltaic cells use photon energy levels to excite charge carriers across barriers.`],
      [`Microscopy`, `Electron microscopes resolve atomic details using small de Broglie wavelengths of electron beams.`],
    ],
  },
  9:
  {
    title: `Atomic and Nuclear Physics`,
    definitions: [
      [`Impact Parameter`, `The perpendicular distance of the velocity vector of an alpha particle from the center of the target nucleus.`],
      [`Mass Defect`, `The difference between the sum of masses of individual nucleons and the actual mass of the nucleus.`],
      [`Half-Life Period`, `The time required for half the number of radioactive nuclei in a sample to decay.`],
    ],
    formulas: [
      `Bohr Orbit Radius: r_n = a_0 * n^2 | Energy: E_n = -13.6 / n^2 (eV)`,
      `Radioactive Decay Law: N(t) = N_0 * e^(-lambda * t) | Half-life T_0.5 = 0.693 / lambda`,
      `Binding Energy: BE = [Z*m_p + (A-Z)*m_n - M_nuc] * c^2`,
    ],
    examples: [
      { q: `If half-life of a material is 5 days, how much of a 10g sample remains after 10 days?`, ans: `Number of half-lives n = 10 / 5 = 2.\nRemaining mass N = N_0 * (0.5)^n = 10 * (0.5)^2 = 10 * 0.25 = 2.5 grams.` },
    ],
    hots: [
      { q: `Derive the expression for the radius of the nth Bohr orbit of a hydrogen atom.`, ans: `Electrostatic force balance: m*v^2/r = e^2 / (4*pi*eps_0*r^2) => m*v^2 = e^2 / (4*pi*eps_0*r).\nBohr quantization: m*v*r = n*h / 2*pi => v = n*h / (2*pi*m*r).\nSubstitute v: m * [n^2*h^2 / (4*pi^2*m^2*r^2)] = e^2 / (4*pi*eps_0*r).\nSimplify to get r_n = (n^2 * h^2 * eps_0) / (pi * m * e^2).` },
    ],
    worksheet: [
      `State Bohr's three postulates of atomic model.`,
      `Write down Rydberg formula for spectral series of hydrogen.`,
      `Define nuclear fission and fusion with example reactions.`,
      `Explain binding energy per nucleon curve significance.`,
      `State radioactive displacement laws (alpha, beta decay).`,
    ],
    applications: [
      [`Energy Grid`, `Nuclear power stations generate steady steam volumes using uranium fission reactions.`],
      [`Medicine`, `Radioactive isotopes like Iodine-131 act as tracing flags to localize thyroid tumors.`],
    ],
  },
  10:
  {
    title: `Electronics and Communication`,
    definitions: [
      [`Intrinsic Semiconductor`, `A pure semiconductor material (e.g. silicon) without any doping impurities.`],
      [`Zener Breakdown`, `The sharp increase in reverse current in a heavily doped PN junction under strong electric fields.`],
      [`Modulation`, `The process of superimposing a low frequency signal onto a high frequency carrier wave for transmission.`],
    ],
    formulas: [
      `Diode Current: I = I_0 * (e^(V / (eta*V_T)) - 1)`,
      `Boolean Logic: AND = A . B | OR = A + B | NOT = ~A`,
      `Transistor Gain: beta = delta_Ic / delta_Ib`,
    ],
    examples: [
      { q: `In a transistor, base current changes by 10 micro-amps, causing collector change of 1 milli-amp. Find beta.`, ans: `beta = delta_Ic / delta_Ib = 10^-3 / 10^-5 = 100.` },
    ],
    hots: [
      { q: `Describe the operation of a PN Junction Diode as a Full Wave Rectifier with a neat circuit and wave forms.`, ans: `Uses a center-tapped transformer and two diodes D1, D2.\nDuring positive half cycle: D1 is forward biased (conducts), D2 is reverse biased. Current flows through load.\nDuring negative half cycle: D2 is forward biased (conducts), D1 reverse biased. Current flows in same direction through load, converting both cycles to DC.` },
    ],
    worksheet: [
      `Differentiate between n-type and p-type semiconductors.`,
      `Explain the working of a Zener Diode as a Voltage Regulator.`,
      `State and prove De Morgan's Theorems.`,
      `Draw the symbol and truth table of a NAND gate.`,
      `What is amplitude modulation? Write down its advantages.`,
    ],
    applications: [
      [`Power Adapters`, `Silicon rectifiers convert AC wall power into DC charging streams for smartphones.`],
      [`Automation Systems`, `Boolean logic gates process logic inputs to trigger automated factory safety shut-offs.`],
    ],
  },
  11:
  {
    title: `Recent Developments in Physics`,
    definitions: [
      [`Nanomaterial`, `Materials having structural features at least one dimension sized between 1 and 100 nanometers.`],
      [`Carbon Nanotube`, `A cylindrical tube structure of carbon atoms showing exceptional electrical and tensile properties.`],
      [`Cosmology`, `The scientific study of the origin, evolution, and eventual fate of the universe.`],
    ],
    formulas: [
      `Quantum dot energy: E proportional to 1 / d^2 (d = particle diameter)`,
      `Hubble's Law: v = H_0 * d (v = recession velocity, d = distance)`,
    ],
    examples: [
      { q: `Explain why properties of materials change at the nanoscale.`, ans: `At nanoscale, surface-to-volume ratio increases dramatically, making surface atoms highly dominant. Additionally, quantum confinement effects restrict electron paths, altering optical, electrical, and magnetic properties.` },
    ],
    hots: [
      { q: `Describe the four fundamental forces of nature and explain the efforts towards Grand Unification Theory (GUT).`, ans: `Forces: (1) Gravitational (weakest, infinite range), (2) Weak nuclear (short range, beta decay), (3) Electromagnetic (infinite, charged), (4) Strong nuclear (strongest, binds quarks).\nGUT attempts to show that at extremely high energy states, these four forces unify into a single master force.` },
    ],
    worksheet: [
      `What is nanoscience? Distinguish between top-down and bottom-up approaches.`,
      `List three properties and applications of carbon nanotubes.`,
      `Explain the concept of quantum dots.`,
      `State Hubble's Law of expanding universe.`,
      `Briefly explain black holes and gravitational waves.`,
    ],
    applications: [
      [`Bio-Sensors`, `Gold nanoparticles target tumor cells in biological assays to flag cancers early.`],
      [`Aerospace Alloys`, `Carbon nanotubes reinforce carbon fibers to construct ultra-light plane bodies.`],
    ],
  },
};

export const chemistry12Data: Record<number, ChapterContent> = {
  1:
  {
    title: `Metallurgy`,
    definitions: [
      [`Ore`, `A mineral from which a metal can be extracted commercially and profitably.`],
      [`Gangue`, `The non-metallic and stony impurities present along with ores in mines (e.g. silica, clay).`],
      [`Calcination`, `The process of heating an ore in the absence of air or in limited supply, decomposing carbonates and hydroxides.`],
    ],
    formulas: [
      `Froh flotation activation: Xanthates select sulfide particles`,
      `Zone refining: impurity solubility liquid > solid phase`,
    ],
    examples: [
      { q: `Differentiate between roasting and calcination.`, ans: `Roasting heats sulfide ores in excess oxygen to form oxides (e.g. 2ZnS + 3O2 -> 2ZnO + 2SO2). Calcination heats carbonate or hydrated ores in absence of air to expel volatile water/CO2 (e.g. CaCO3 -> CaO + CO2).` },
    ],
    hots: [
      { q: `Explain the thermodynamic principles of metallurgy using Ellingham diagram curves.`, ans: `Plots Gibbs energy change versus temperature for oxide formation.\nA metal can reduce the oxide of another metal if its curve lies below the other metal's curve at that temperature, as the net free energy change delta_G of the combined reaction is negative.` },
    ],
    worksheet: [
      `Describe the froth floatation method for concentrating sulfide ores.`,
      `Explain the extraction of gold using cyanide leaching.`,
      `Describe Mond process for refining Nickel with equations.`,
      `List the ores of aluminium, iron, and copper.`,
      `What is slag? How is it formed in blast furnaces?`,
    ],
    applications: [
      [`Aviation Alloys`, `Hall-Heroult smelting isolates pure aluminium, structural metal for plane frames.`],
      [`Electronics`, `Zone refining purifies silicon crystals to 99.999999% purity for CPU microchips.`],
    ],
  },
  2:
  {
    title: `p-Block Elements - I`,
    definitions: [
      [`Inert Pair Effect`, `The reluctance of s valence electrons of heavier p-block elements to participate in bonding, making lower oxidation states stable.`],
      [`Allotropy`, `The property of an element to exist in two or more different physical forms having similar chemical properties (e.g. diamond, graphite).`],
      [`Zeolites`, `Microporous, aluminosilicate minerals commonly used as commercial adsorbents and catalysts.`],
    ],
    formulas: [
      `Diborane synthesis: 3LiBH4 + 4BF3 -> 2B2H6 + 3LiBF4`,
      `Orthoboric acid: B(OH)3 + 2H2O <=> [B(OH)4]- + H3O+`,
    ],
    examples: [
      { q: `Explain the anomalous behavior of Boron in Group 13.`, ans: `Boron is small, has high ionization energy, and lacks d orbitals. Thus, it forms covalent compounds, is a non-metal, and cannot expand its octet beyond 4.` },
    ],
    hots: [
      { q: `Describe the structure of diborane (B2H6), explaining the nature of bridge bonds and 3-center-2-electron bonds.`, ans: `Contains four terminal B-H bonds (normal 2c-2e). The remaining two hydrogen atoms form bridge bonds between the boron atoms (B-H-B). These bridge bonds are 3-center-2-electron bonds (banana bonds), where two electron pairs are shared across three atoms.` },
    ],
    worksheet: [
      `State the inert pair effect trends in Group 13 and Group 14.`,
      `How is Borax prepared? Write its uses.`,
      `Describe the structure and properties of Silicones.`,
      `Explain carbon allotropes: Diamond, Graphite, Fullerenes.`,
      `What is alum? How is it prepared?`,
    ],
    applications: [
      [`Glass Industry`, `Borax is added to glass mixtures to manufacture thermal shock-resistant borosilicate lab beakers.`],
      [`Lubricants`, `Silicone fluids act as heat-stable lubricants in engine gearboxes.`],
    ],
  },
  3:
  {
    title: `p-Block Elements - II`,
    definitions: [
      [`Interhalogen Compounds`, `Compounds formed by the reaction of two different halogen elements (e.g. ClF3, ICl).`],
      [`Allotropes of Sulphur`, `Sulphur exists in rhombic (alpha) and monoclinic (beta) forms, converting at transition temperature 369K.`],
      [`Aqua Regia`, `A highly corrosive mixture of concentrated HCl and HNO3 in 3:1 ratio, capable of dissolving gold and platinum.`],
    ],
    formulas: [
      `Aqua Regia attack: Au + HNO3 + 4HCl -> HAuCl4 + NO + 2H2O`,
      `Contact Process: 2SO2 + O2 <=> 2SO3 (V2O5 catalyst)`,
    ],
    examples: [
      { q: `Why is Fluorine highly reactive among halogens?`, ans: `Due to its small size, high electronegativity, and low F-F bond dissociation energy (resulting from strong inter-electronic repulsions of lone pairs).` },
    ],
    hots: [
      { q: `Describe Haber's Process for Ammonia and Contact Process for Sulphuric acid, giving optimal conditions and equations.`, ans: `(1) Ammonia: N2 + 3H2 <=> 2NH3 (450C, 200 atm, Fe catalyst).\n(2) Sulphuric acid: SO2 + O2 <=> SO3 (V2O5 catalyst). SO3 + H2SO4 -> H2S2O7 (oleum). Oleum + H2O -> 2H2SO4.` },
    ],
    worksheet: [
      `Describe the allotropes of Phosphorus.`,
      `Explain why helium is used in diving gas cylinders.`,
      `Write structures of XeF2, XeF4, and XeF6.`,
      `Describe preparation of nitric acid by Ostwald process.`,
      `Compare the acidic strength of hydrogen halides.`,
    ],
    applications: [
      [`Fertilizers`, `Haber process ammonia is neutralized with nitric acid to produce ammonium nitrate crop fertilizers.`],
      [`Industrial Grids`, `Noble gas neon is filled in high voltage indicators to glow orange warning signals.`],
    ],
  },
  4:
  {
    title: `Transition and Inner Transition Elements`,
    definitions: [
      [`Transition Element`, `An element whose atom has a partially filled d subshell in ground state or common oxidation states.`],
      [`Lanthanide Contraction`, `The steady decrease in atomic and ionic radii of lanthanide elements with increasing atomic number, caused by poor shielding of 4f electrons.`],
      [`Interstitial Compound`, `Compounds formed when small atoms like H, C, or N are trapped in the interstitial spaces of transition metal lattices.`],
    ],
    formulas: [
      `Magnetic Moment: mu = sqrt(n * (n + 2)) Bohr Magnetons (n = unpaired electrons)`,
      `Lanthanide shielding sequence: s > p > d > f`,
    ],
    examples: [
      { q: `Calculate spin-only magnetic moment of Fe2+ (Z=26).`, ans: `Fe: [Ar] 3d6 2s2. Fe2+: [Ar] 3d6. Orbitals have 4 unpaired electrons (n=4).\nmu = sqrt(4 * 6) = sqrt(24) = 4.90 Bohr Magnetons.` },
    ],
    hots: [
      { q: `State Lanthanide Contraction. Explain its causes and two key consequences on transition elements properties.`, ans: `Steady radius decrease from La to Lu.\nCause: Poor shielding of 4f electrons fails to counter growing nuclear charge.\nConsequences: (1) 4d and 5d transition series (e.g. Zr and Hf) show almost identical atomic sizes, (2) Basic strength of hydroxides decreases from La(OH)3 to Lu(OH)3.` },
    ],
    worksheet: [
      `Why do transition metals exhibit variable oxidation states?`,
      `Explain why transition metal complexes are colorful.`,
      `Describe the preparation of potassium dichromate (K2Cr2O7) from chromite ore.`,
      `List three differences between lanthanides and actinides.`,
      `Why is zinc not considered a true transition metal?`,
    ],
    applications: [
      [`Aerospace Alloys`, `Titanium transition metal lattices are alloyed with aluminium to build jet turbine blades.`],
      [`Industrial Catalysis`, `Finely divided nickel and platinum speed up food hydrogenation and auto emission filters.`],
    ],
  },
  5:
  {
    title: `Coordination Chemistry`,
    definitions: [
      [`Ligand`, `An ion or molecule bound to a central metal atom in a coordination complex by donating electron pairs.`],
      [`Coordination Number`, `The number of donor atoms of ligands directly attached to the central metal ion in a complex.`],
      [`Chelation`, `The formation of two or more separate coordinate bonds between a polydentate ligand and a single central metal.`],
    ],
    formulas: [
      `Effective Atomic Number: EAN = Z - (Oxidation State) + 2 * (Coordination Number)`,
      `IUPAC Prefix: di, tri, tetra | Polydentate: bis, tris, tetrakis`,
    ],
    examples: [
      { q: `Calculate EAN of central metal in [Fe(CN)6]4- (Z of Fe = 26).`, ans: `Oxidation state of Fe is +2. Coordination number is 6.\nEAN = 26 - 2 + 2(6) = 24 + 12 = 36 (achieves Krypton noble configuration).` },
    ],
    hots: [
      { q: `Apply Valence Bond Theory to predict hybridization, geometry, and magnetic nature of [CoF6]3-.`, ans: `Co is +3 state ([Ar] 3d6). F- is a weak field ligand, cannot pair electrons.\nUnpaired electrons: 4. Hybridization involves outer orbitals: sp3d2.\nGeometry: Octahedral.\nNature: High spin paramagnetic complex.` },
    ],
    worksheet: [
      `State Werner's theory postulates.`,
      `Write IUPAC name for: (1) [Co(NH3)6]Cl3, (2) K4[Fe(CN)6].`,
      `Differentiate between homoleptic and heteroleptic complexes.`,
      `Explain linkage isomerism and coordination isomerism with examples.`,
      `What is crystal field splitting energy (CFSE)?`,
    ],
    applications: [
      [`Medicine`, `EDTA chelates heavy metal ions like lead to treat clinical lead poisoning cases.`],
      [`Photography`, `Sodium thiosulfate washes away unexposed silver bromide complexes during film development.`],
    ],
  },
  6:
  {
    title: `Solid State`,
    definitions: [
      [`Amorphous Solid`, `A solid whose constituent particles lack a regular, long-range ordered three-dimensional arrangement (e.g. glass).`],
      [`Unit Cell`, `The smallest repeating structural unit of a crystalline solid which, when repeated in space, generates the entire lattice.`],
      [`Schottky Defect`, `A point defect in ionic crystals where equal numbers of cations and anions are missing from their lattice sites.`],
    ],
    formulas: [
      `Bragg's Law: 2 * d * sin(theta) = n * lambda`,
      `Density of crystal: rho = (n * M) / (a^3 * N_A)`,
      `Packing efficiency (FCC): 74% | BCC: 68% | Simple Cubic: 52.4%`,
    ],
    examples: [
      { q: `A BCC metal has unit cell edge 300pm. Find the radius of the metal atom.`, ans: `For BCC: 4r = sqrt(3) * a.\nr = sqrt(3) * 300 / 4 = 1.732 * 75 = 129.9 pm.` },
    ],
    hots: [
      { q: `Derive packing efficiency of a Face Centered Cubic (FCC) lattice unit cell.`, ans: `Unit cell has 4 atoms. Volume of 4 spheres V_s = 4 * (4/3)*pi*r^3 = (16/3)*pi*r^3.\nIn FCC, face diagonal b^2 = a^2 + a^2 = 2*a^2. Since b = 4r, 16*r^2 = 2*a^2 => a = 2*sqrt(2)*r.\nUnit cell volume V_c = a^3 = 16*sqrt(2)*r^3.\nEfficiency = V_s / V_c = [(16/3)*pi*r^3] / [16*sqrt(2)*r^3] = pi / (3*sqrt(2)) = 74%.` },
    ],
    worksheet: [
      `Distinguish between crystalline and amorphous solids.`,
      `What are Frenkel defects? Compare them with Schottky defects.`,
      `Explain coordination numbers of atoms in SC, BCC, and FCC structures.`,
      `Calculate density of NaCl crystal if edge length is 564pm (Molar mass = 58.5).`,
      `What are metal excess and metal deficiency defects?`,
    ],
    applications: [
      [`Optoelectronics`, `Gallium arsenide FCC crystals are sliced into wafer substrates for laser diodes.`],
      [`Sensors`, `Piezoelectric quartz crystal grids generate micro-electric spikes under mechanical stress pressure.`],
    ],
  },
  7:
  {
    title: `Chemical Kinetics`,
    definitions: [
      [`Rate of Reaction`, `The change in concentration of a reactant or product per unit time in a chemical process.`],
      [`Order of Reaction`, `The sum of the concentration exponents of reactants in the experimentally derived rate law equation.`],
      [`Half-Life`, `The time required for reactant concentration to decrease to exactly half of its initial value.`],
    ],
    formulas: [
      `First Order Rate: k = (2.303 / t) * log10([A]_0 / [A])`,
      `First Order Half-Life: t_0.5 = 0.693 / k`,
      `Arrhenius Equation: k = A * e^(-E_a / R * T)`,
    ],
    examples: [
      { q: `A first-order reaction has k = 0.0693 min^-1. Find its half-life.`, ans: `t_0.5 = 0.693 / k = 0.693 / 0.0693 = 10 minutes.` },
    ],
    hots: [
      { q: `Derive the integrated rate equation for a first-order chemical reaction.`, ans: `Rate = -d[A]/dt = k * [A] => d[A]/[A] = -k dt.\nIntegrate: ln([A]) = -kt + C. At t=0, [A]=[A]_0 => C = ln([A]_0).\nln([A]) = -kt + ln([A]_0) => kt = ln([A]_0 / [A]).\nConvert to base 10: k = (2.303 / t) * log10([A]_0 / [A]).` },
    ],
    worksheet: [
      `Differentiate between rate of reaction and rate constant.`,
      `Explain molecularity of a reaction. How does it differ from order?`,
      `State the Arrhenius equation and write down its logarithmic form.`,
      `Show that half-life of zero-order reaction is proportional to initial concentration.`,
      `Explain collision theory and activation energy.`,
    ],
    applications: [
      [`Pharmacology`, `Drug half-lives are evaluated to calibrate dosing intervals, keeping bloodstream levels safe.`],
      [`Archaeology`, `Carbon-14 half-life of 5730 years calibrates dating timelines of fossil relics.`],
    ],
  },
  8:
  {
    title: `Ionic Equilibrium`,
    definitions: [
      [`Lewis Acid and Base`, `Acid is an electron pair acceptor (e.g. BF3); base is an electron pair donor (e.g. NH3).`],
      [`Buffer Solution`, `A solution containing a weak acid/conjugate base that resists pH changes upon acid/base additions.`],
      [`Solubility Product`, `The product of molar concentrations of constituent ions in a saturated salt solution, raised to powers.`],
    ],
    formulas: [
      `pH relation: pH = -log10[H+] | pH + pOH = 14`,
      `Ostwald's Dilution: K_a = alpha^2 * C / (1 - alpha) = alpha^2 * C (for alpha << 1)`,
      `Henderson-Hasselbalch: pH = pKa + log10([Salt] / [Acid])`,
    ],
    examples: [
      { q: `Calculate pH of a 10^-3 M HCl solution.`, ans: `HCl dissociates fully: [H+] = 10^-3 M.\npH = -log10(10^-3) = 3.` },
    ],
    hots: [
      { q: `Derive Henderson-Hasselbalch equation for an acidic buffer solution.`, ans: `Weak acid HA <=> H+ + A-. K_a = [H+][A-] / [HA] => [H+] = K_a * [HA] / [A-].\nTake negative log: -log[H+] = -log(K_a) - log([HA]/[A-]).\npH = pKa + log([A-] / [HA]) = pKa + log([Salt] / [Acid]).` },
    ],
    worksheet: [
      `Explain conjugate acid-base pairs with an example.`,
      `State Ostwald's Dilution Law.`,
      `Explain the common ion effect with a chemical example.`,
      `What is buffer capacity? Write buffer index expression.`,
      `Define solubility product Ksp and write expression for AgCl.`,
    ],
    applications: [
      [`Biomedicine`, `Carbonic acid bicarbonate buffers maintain human blood pH at exactly 7.4.`],
      [`Industrial Electroplating`, `Metal plating baths maintain strict pH limits to ensure uniform metal deposits.`],
    ],
  },
  9:
  {
    title: `Electrochemistry`,
    definitions: [
      [`Molar Conductivity`, `The conducting power of all the ions produced by dissolving one mole of electrolyte in solution.`],
      [`Kohlrausch Law`, `At infinite dilution, the limiting molar conductivity of an electrolyte is the sum of individual ionic contributions.`],
      [`Standard Hydrogen Electrode (SHE)`, `A reference electrode containing a platinum plate in 1M H+ gas-purged solution, defined as 0.00V.`],
    ],
    formulas: [
      `Molar Conductivity: Lambda_m = (kappa * 1000) / M (kappa = specific conductance)`,
      `Nernst Equation: E_cell = E_0_cell - (0.0591 / n) * log10(Q) at 298K`,
      `Gibbs energy: delta_G = -n * F * E_cell`,
    ],
    examples: [
      { q: `Calculate cell potential of Daniell cell at 25C when Zn2+=0.1M, Cu2+=1.0M. (E_0 = 1.10V)`, ans: `Reaction: Zn + Cu2+ -> Zn2+ + Cu. n = 2. Q = [Zn2+]/[Cu2+] = 0.1.\nE = E_0 - (0.0591 / 2) * log10(0.1) = 1.10 - 0.0295 * (-1) = 1.10 + 0.0295 = 1.13V.` },
    ],
    hots: [
      { q: `State Kohlrausch's law and explain how it evaluates limiting molar conductivity of weak electrolytes like Acetic acid.`, ans: `Kohlrausch states limiting conductivity is sum of ion conductivities.\nFor CH3COOH: Lambda_0(CH3COOH) = lambda_0(CH3COO-) + lambda_0(H+).\nEvaluated by combining strong electrolytes: Lambda_0(CH3COONa) + Lambda_0(HCl) - Lambda_0(NaCl).` },
    ],
    worksheet: [
      `Define specific conductance and cell constant.`,
      `State Faraday's two laws of electrolysis.`,
      `Describe the construction and working of a Daniell Cell.`,
      `Write the Nernst equation and define each term.`,
      `Explain electrochemical rusting corrosion.`,
    ],
    applications: [
      [`Heavy Smelting`, `Electrolytic refineries isolate structural copper using copper sulfate solutions.`],
      [`Automotive Systems`, `Lead-acid battery grids store electric power via reversible chemical transfers.`],
    ],
  },
  10:
  {
    title: `Surface Chemistry`,
    definitions: [
      [`Adsorption`, `The accumulation of molecular species at the surface rather than in the bulk of a solid or liquid.`],
      [`Colloid`, `A heterogeneous system where one substance is dispersed (particles 1-1000nm) in another medium.`],
      [`Tyndall Effect`, `The scattering of light rays by colloidal particles dispersed in a medium, illuminating the beam path.`],
    ],
    formulas: [
      `Freundlich isotherm: x/m = k * P^(1/n) (n > 1)`,
      `Electrophoretic velocity: balance of charge drag and electric field`,
    ],
    examples: [
      { q: `Differentiate between physisorption and chemisorption.`, ans: `Physisorption involves weak van der Waals forces, is reversible, and lacks specificity. Chemisorption involves strong chemical bond formation, is irreversible, and is highly specific.` },
    ],
    hots: [
      { q: `Explain what homogeneous and heterogeneous catalysis are, detailing the adsorption theory of heterogeneous catalysts.`, ans: `(1) Homogeneous: catalyst and reactants in same phase. (2) Heterogeneous: different phases. Adsorption theory steps: (a) Diffusion of reactants to catalyst surface, (b) Adsorption, (c) Chemical reaction (forming activated complex), (d) Desorption of products, (e) Diffusion of products away.` },
    ],
    worksheet: [
      `What is Freundlich adsorption isotherm? Write the mathematical expression.`,
      `Classify colloids based on dispersed phase and dispersion medium.`,
      `Describe the purification of colloids by Dialysis.`,
      `State Hardy-Schulze rule for coagulation.`,
      `Explain emulsion types (oil-in-water and water-in-oil).`,
    ],
    applications: [
      [`Gas Masks`, `Activated charcoal filters adsorb toxic gas molecules, keeping air passages clean.`],
      [`Medicine`, `Intravenous drug emulsions are formulated as colloids to deliver lipophilic medicines directly.`],
    ],
  },
  11:
  {
    title: `Hydroxy Compounds and Ethers`,
    definitions: [
      [`Lucas Test`, `A chemical test to differentiate primary, secondary, and tertiary alcohols based on turbidity speeds with ZnCl2/HCl.`],
      [`Williamson Synthesis`, `An organic reaction involving nucleophilic attack of an alkoxide ion on a primary alkyl halide to form ethers.`],
      [`Phenol`, `An organic compound containing a hydroxyl group directly bonded to an aromatic benzene ring.`],
    ],
    formulas: [
      `Lucas turbidity speed: Tertiary (immediate) > Secondary (5 mins) > Primary (none at room temp)`,
      `Williamson: R-O- Na+ + R'-X -> R-O-R' + NaX`,
    ],
    examples: [
      { q: `Convert Phenol to Benzene.`, ans: `Heat Phenol (C6H5OH) with Zinc dust. Zinc reduces phenol, distilling pure Benzene (C6H6) and forming Zinc Oxide (ZnO).` },
    ],
    hots: [
      { q: `Explain the mechanism of acid-catalyzed dehydration of Ethanol to form Ethene.`, ans: `Mechanism: (1) Protonation of alcohol: C2H5OH + H+ -> C2H5OH2+.\n(2) Carbocation formation (slow step): C2H5OH2+ -> CH3-CH2+ + H2O.\n(3) Deprotonation (fast): CH3-CH2+ -> CH2=CH2 + H+, regenerating the acid catalyst.` },
    ],
    worksheet: [
      `How do you distinguish primary, secondary, and tertiary alcohols using the Victor Meyer test?`,
      `Describe the preparation of phenol by Dow's Process.`,
      `Explain Kolbe's Reaction of Phenol (salicylic acid formation).`,
      `Write the equation for Reimer-Tiemann reaction.`,
      `Describe the cleavage of ethers by Halogen acids (HI).`,
    ],
    applications: [
      [`Antiseptics`, `Phenol derivatives act as strong disinfectants in sanitizing hospital grids.`],
      [`Chemical Synthesis`, `Diethyl ether acts as an extraction solvent to synthesize organic intermediates.`],
    ],
  },
  12:
  {
    title: `Carbonyl Compounds and Carboxylic Acids`,
    definitions: [
      [`Aldol Condensation`, `An organic reaction where aldehydes/ketones with alpha-hydrogens react under dilute base to form beta-hydroxycarbonyls.`],
      [`Cannizzaro Reaction`, `A redox self-disproportionation of aldehydes lacking alpha-hydrogens under concentrated base to form alcohol and acid salt.`],
      [`Hell-Volhard-Zelinsky (HVZ) Reaction`, `The selective alpha-halogenation of carboxylic acids using halogen and red phosphorus catalyst.`],
    ],
    formulas: [
      `Aldol condition: requires C-H adjacent to carbonyl`,
      `Cannizzaro disproportionation: 2R-CHO + NaOH -> R-CH2OH + R-COONa`,
    ],
    examples: [
      { q: `Predict the product: Acetaldehyde + dilute NaOH.`, ans: `Undergoes Aldol condensation: 2CH3CHO -> CH3-CH(OH)-CH2-CHO (3-hydroxybutanal). Heating dehydrates it to Crotonaldehyde (CH3-CH=CH-CHO).` },
    ],
    hots: [
      { q: `Describe the mechanism of nucleophilic addition reaction of hydrogen cyanide (HCN) to a carbonyl group.`, ans: `(1) Nucleophile CN- attacks polar carbonyl carbon perpendicularly, forming tetrahedral alkoxide intermediate.\n(2) Intermediate abstracts proton H+ from water or solvent to form Cyanohydrin compound.` },
    ],
    worksheet: [
      `Write chemical equations for: (1) Rosenmund Reduction, (2) Clemmensen Reduction.`,
      `Explain Tollens' test and Fehling's test to differentiate aldehydes and ketones.`,
      `Explain Cannizzaro reaction mechanism using Benzaldehyde.`,
      `How is Acetic acid converted to Monochloroacetic acid? (HVZ Reaction).`,
      `Compare the acidic strengths of formic, acetic, and chloroacetic acids.`,
    ],
    applications: [
      [`Food Additives`, `Acetic acid acts as vinegar preservative in commercial food processing.`],
      [`Polymer Synthetics`, `Formaldehyde is polymerized with phenol to manufacture Bakelite circuit casings.`],
    ],
  },
  13:
  {
    title: `Organic Nitrogen Compounds`,
    definitions: [
      [`Gabriel Phthalimide Synthesis`, `A chemical method used to prepare pure primary aliphatic amines without secondary/tertiary contamination.`],
      [`Hoffmann Bromamide Degradation`, `The conversion of an amide to a primary amine with one less carbon atom, using bromine and alkali.`],
      [`Diazotisation`, `The reaction of primary aromatic amines with nitrous acid at 0-5C to form diazonium salts.`],
    ],
    formulas: [
      `Hoffmann Degradation: R-CONH2 + Br2 + 4NaOH -> R-NH2 + Na2CO3 + 2NaBr + 2H2O`,
      `Amine Basicity: Secondary > Primary > Tertiary (in aqueous methylamines)`,
    ],
    examples: [
      { q: `Convert Aniline to Benzenediazonium Chloride.`, ans: `React Aniline (C6H5NH2) with nitrous acid (NaNO2 + HCl) at ice cold temperature (273-278K). Diazotisation yields C6H5N2+ Cl-.` },
    ],
    hots: [
      { q: `Explain why aliphatic amines are stronger bases than aromatic amines like aniline.`, ans: `Aliphatic amines have +I alkyl groups which release electrons, increasing electron density on nitrogen. In aniline, the lone pair on nitrogen is delocalized into the benzene ring through resonance, making it less available for protonation.` },
    ],
    worksheet: [
      `Describe the preparation of primary amines by Gabriel Phthalimide Synthesis.`,
      `Write chemical equations for: (1) Carbylamine reaction, (2) Mustard oil reaction.`,
      `Explain the coupling reactions of benzenediazonium chloride with phenol.`,
      `How do primary, secondary, and tertiary amines react with nitrous acid?`,
      `Write a note on Schotten-Baumann reaction.`,
    ],
    applications: [
      [`Dye Industry`, `Diazonium coupling reactions synthesize vibrant azo dyes for clothing textiles.`],
      [`Drug Design`, `Amine salts form the soluble base of local anesthetics like novocaine.`],
    ],
  },
  14:
  {
    title: `Biomolecules`,
    definitions: [
      [`Zwitterion`, `An amino acid dipolar ion containing equal numbers of positively and negatively charged functional groups, showing net neutrality.`],
      [`Peptide Bond`, `A covalent amide linkage (-CO-NH-) formed by condensation of carboxyl and amino groups of two amino acids.`],
      [`Denaturation of Proteins`, `The disruption of secondary, tertiary, and quaternary protein structures by heat or pH shifts, losing biological activity.`],
    ],
    formulas: [
      `Mutarotation: Alpha-D-glucose (112 deg) and Beta-D-glucose (19 deg) equilibrate to 52.7 deg`,
      `Nucleotide: Pentose sugar + Nitrogenous base + Phosphate`,
    ],
    examples: [
      { q: `Differentiate between DNA and RNA regarding sugar and bases.`, ans: `DNA contains deoxyribose sugar and thymine base (A, T, G, C). RNA contains ribose sugar and uracil base (A, U, G, C).` },
    ],
    hots: [
      { q: `Describe the structural features of DNA double helix as proposed by Watson and Crick.`, ans: `Consists of two polynucleotide chains coiled around a common axis. The chains run anti-parallel (5'->3' and 3'->5'). Bases are inside, sugars outside. Adenine pairs with Thymine (2 H-bonds); Guanine pairs with Cytosine (3 H-bonds).` },
    ],
    worksheet: [
      `Explain mutarotation of glucose.`,
      `Describe the structure of amino acids. What is isoelectric point?`,
      `Compare fibrous proteins and globular proteins.`,
      `Explain the primary, secondary, and tertiary structures of proteins.`,
      `What are vitamins? Classify them based on solubility with examples.`,
    ],
    applications: [
      [`Food Nutrition`, `Starch carbohydrate polymers are metabolized into blood glucose to fuel physical activity.`],
      [`Forensic Science`, `DNA double helix stability allows matching genetic signatures in crime assays.`],
    ],
  },
  15:
  {
    title: `Chemistry in Everyday Life`,
    definitions: [
      [`Antiseptic`, `Chemical agents applied to living tissues that kill or prevent growth of microorganisms without tissue damage (e.g. Dettol).`],
      [`Biodegradable Detergent`, `Surfactants with linear hydrocarbon chains that can be easily decomposed by soil microorganisms.`],
      [`Food Preservative`, `Chemical substances added to food to prevent spoilage from microbial growth or oxidation (e.g. sodium benzoate).`],
    ],
    formulas: [
      `Soap Saponification: Glyceryl ester of fatty acid + 3NaOH -> Glycerol + 3Soap`,
      `Aspirin (Acetylsalicylic acid) synthesis: Salicylic acid + Acetic anhydride`,
    ],
    examples: [
      { q: `Differentiate between antiseptics and disinfectants.`, ans: `Antiseptics are safe for living tissues (e.g., 0.2% phenol, dettol). Disinfectants are toxic for living tissue and applied to non-living floors/drains (e.g., 1% phenol).` },
    ],
    hots: [
      { q: `Explain the cleansing action of soaps and the formation of micelles in water cleaning.`, ans: `Soap molecules have a hydrophilic polar head (-COONa) and a hydrophobic non-polar tail (hydrocarbon).\nIn water, they organize into spherical micelles: hydrophobic tails cluster inward around oil/dirt, while hydrophilic heads point outward. Rinsing pulls the micelle and trapped dirt away.` },
    ],
    worksheet: [
      `Classify drugs based on therapeutic action with examples.`,
      `What are artificial sweetening agents? Why are they used?`,
      `Explain saponification of fats.`,
      `Describe the difference between cationic and anionic detergents.`,
      `Write a note on thermoplastic and thermosetting polymers.`,
    ],
    applications: [
      [`Clinical Hygiene`, `Phenols are diluted to formulate surgical hand-washes to disinfect clinical staff.`],
      [`Food Packaging`, `Preservatives are added to processed foods to maintain shelf life bounds during shipping.`],
    ],
  },
};


// ==================== CLASS 9 ====================

export const maths9Data: Record<number, ChapterContent> = {
  1: {
    title: `Set Language`,
    definitions: [
      [`Set`, `A well-defined collection of objects. 'Well-defined' means that we can definitely decide whether a given object belongs to the set or not.`],
      [`Empty Set`, `A set consisting of no elements. It is denoted by {} or \u00D8. Also called a null set or void set.`],
      [`Cardinal Number`, `The number of elements in a finite set A, denoted by n(A).`],
      [`Power Set`, `The set of all subsets of a set A, denoted by P(A). The number of subsets is 2^n, where n = n(A).`],
    ],
    formulas: [
      `n(A \u222A B) = n(A) + n(B) - n(A \u2229 B)`,
      `n(A \u222A B \u222A C) = n(A) + n(B) + n(C) - n(A \u2229 B) - n(B \u2229 C) - n(A \u2229 C) + n(A \u2229 B \u2229 C)`,
      `Commutative Laws: A \u222A B = B \u222A A | A \u2229 B = B \u2229 A`,
      `De Morgan's Laws: (A \u222A B)' = A' \u2229 B' | (A \u2229 B)' = A' \u2222 B'`,
      `Distributive Laws: A \u2229 (B \u222A C) = (A \u2229 B) \u222A (A \u2229 C)`,
    ],
    examples: [
      { q: `If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, find A \u222A B and A \u2229 B.`, ans: `A \u222A B (Union) combines all unique elements: {1, 2, 3, 4, 5, 6}.\nA \u2229 B (Intersection) finds common elements: {3, 4}.` },
      { q: `Given n(A) = 15, n(B) = 12, and n(A \u2229 B) = 5, find n(A \u222A B).`, ans: `Using the formula n(A \u222A B) = n(A) + n(B) - n(A \u2229 B):\nn(A \u222A B) = 15 + 12 - 5 = 22.` }
    ],
    hots: [
      { q: `In a school of 100 students, 60 play Cricket, 50 play Football, and 20 play both. Find the number of students who play neither sport.`, ans: `Let C be Cricket and F be Football.\nGiven: n(U) = 100, n(C) = 60, n(F) = 50, n(C \u2229 F) = 20.\nFind union: n(C \u222A F) = n(C) + n(F) - n(C \u2229 F) = 60 + 50 - 20 = 90.\nStudents playing neither = n(U) - n(C \u222A F) = 100 - 90 = 10.` }
    ],
    worksheet: [
      `If A = {a, b, c}, list all subsets and find P(A).`,
      `Verify n(A \u222A B) if A = {1, 2, 5} and B = {2, 5, 6}.`,
      `State De Morgan's Law for set complementation.`,
      `In a group of 50 people, 35 speak Tamil, 22 speak English, and 12 speak both. Find how many speak neither.`,
      `Prove that A \u2229 (B \u222A C) = (A \u2229 B) \u222A (A \u2229 C) using Venn diagrams.`
    ],
    applications: [
      [`Computer Databases`, `Set operations (Union, Intersect, Difference) form the mathematical basis of SQL JOIN queries, matching tables together.`],
      [`Search Engines`, `Google search indexing uses Boolean logic (AND = Intersection, OR = Union, NOT = Complement) to filter web documents.`],
    ],
  },
  2: {
    title: `Real Numbers`,
    definitions: [
      [`Rational Number`, `A number that can be expressed in the form p/q, where p and q are integers and q \u2260 0. Its decimal form is terminating or recurring.`],
      [`Irrational Number`, `A number that cannot be written in the form p/q. Its decimal expansion is non-terminating and non-recurring, like \u03C0 or \u221A2.`],
      [`Real Numbers`, `The collection of all rational and irrational numbers combined, denoted by R.`],
      [`Surd`, `An irrational root of a rational number. For example, \u221Aa is a surd of order 2 if a is rational but not a perfect square.`],
    ],
    formulas: [
      `Laws of Radicals: (a^n)^(1/n) = a`,
      `Radical multiplication: a^(1/n) * b^(1/n) = (ab)^(1/n)`,
      `Conjugate of (a + \u221Ab) is (a - \u221Ab). Their product is a^2 - b.`,
      `Scientific Notation: a * 10^n where 1 \u2264 a < 10 and n is an integer.`,
    ],
    examples: [
      { q: `Express 0.333... in p/q form.`, ans: `Let x = 0.333... (Eq 1)\n10x = 3.333... (Eq 2)\nSubtract Eq 1 from Eq 2: 9x = 3 => x = 3/9 = 1/3.` },
      { q: `Rationalise the denominator of 1 / (3 + \u221A2).`, ans: `Multiply numerator and denominator by conjugate (3 - \u221A2):\n1*(3 - \u221A2) / [(3 + \u221A2)(3 - \u221A2)] = (3 - \u221A2) / (9 - 2) = (3 - \u221A2) / 7.` }
    ],
    hots: [
      { q: `Find the rationalising factor of 5^(1/3).`, ans: `We multiply by 5^(2/3) to make the exponent 1:\n5^(1/3) * 5^(2/3) = 5^(1/3 + 2/3) = 5^1 = 5.\nSo the rationalising factor is 5^(2/3) or \u221B25.` }
    ],
    worksheet: [
      `Represent \u221A2 on the number line.`,
      `Simplify: \u221A12 + \u221A27 - \u221A48.`,
      `Express 0.0000456 in scientific notation.`,
      `Rationalise: 2 / (\u221A5 - \u221A3).`,
      `Identify whether \u221A8 is rational or irrational.`
    ],
    applications: [
      [`Acoustic Engineering`, `Equal temperament musical scales use frequencies scaled by 2^(1/12) (an irrational number) to tune instruments.`],
      [`Physics Scales`, `Scientific notation allows physicists to handle massive scales, like the mass of the Earth (5.972 x 10^24 kg) without calculation errors.`],
    ],
  },
  3: {
    title: `Algebra`,
    definitions: [
      [`Polynomial`, `An algebraic expression consisting of variables and constants, using operations of addition, subtraction, multiplication, and non-negative integer exponents.`],
      [`Degree of Polynomial`, `The highest power of the variable in the polynomial.`],
      [`Remainder Theorem`, `If a polynomial p(x) is divided by (x - a), the remainder is p(a).`],
      [`Factor Theorem`, `If p(a) = 0 for a polynomial p(x), then (x - a) is a factor of p(x).`],
    ],
    formulas: [
      `Identity: (x + y)^2 = x^2 + 2xy + y^2`,
      `Identity: (x - y)^2 = x^2 - 2xy + y^2`,
      `Identity: (x + y)(x - y) = x^2 - y^2`,
      `Cubic: (x + y)^3 = x^3 + y^3 + 3xy(x + y)`,
      `Cubic: (x - y)^3 = x^3 - y^3 - 3xy(x - y)`,
    ],
    examples: [
      { q: `Factorise x^2 - 5x + 6.`, ans: `Find two numbers whose product is 6 and sum is -5. They are -2 and -3.\nx^2 - 2x - 3x + 6 = x(x - 2) - 3(x - 2) = (x - 2)(x - 3).` },
      { q: `Find the remainder when p(x) = x^3 - 3x^2 + 4x - 5 is divided by (x - 2).`, ans: `By Remainder Theorem, remainder is p(2):\np(2) = (2)^3 - 3(2)^2 + 4(2) - 5 = 8 - 12 + 8 - 5 = -1.` }
    ],
    hots: [
      { q: `Find the values of a and b if the polynomial x^3 - ax^2 + bx - 6 is exactly divisible by (x - 1) and (x - 2).`, ans: `Since it is divisible, p(1) = 0 and p(2) = 0.\np(1) = 1 - a + b - 6 = 0 => a - b = -5 (Eq 1)\np(2) = 8 - 4a + 2b - 6 = 0 => 2a - b = 1 (Eq 2)\nSubtracting Eq 1 from Eq 2: a = 6. Substituting in Eq 1: b = 11.` }
    ],
    worksheet: [
      `Divide x^3 - 3x^2 + 5x - 3 by x - 1 using synthetic division.`,
      `Factorise: 2x^2 + 7x + 6.`,
      `Expand: (2a + 3b)^3.`,
      `Find the degree of the polynomial: 4x^5 - 3x^2 + 2x - 1.`,
      `Solve the linear equation: 3x - 5 = 2x + 7.`
    ],
    applications: [
      [`Computer Graphics`, `Polynomials model smooth B\u00E9zier curves used in digital design, vector drawing, and engineering aerodynamic designs.`],
      [`Economics`, `Linear equations determine business break-even points, correlating cost and revenue functions to compute profit margins.`],
    ],
  },
  4: {
    title: `Geometry`,
    definitions: [
      [`Congruent Triangles`, `Two triangles are congruent if their corresponding sides are equal in length and their corresponding angles are equal in measure.`],
      [`Midpoint Theorem`, `The line segment connecting the midpoints of two sides of a triangle is parallel to the third side and is half of its length.`],
      [`Chord of a Circle`, `A straight line segment whose endpoints both lie on the circumference of a circle.`],
      [`Cyclic Quadrilateral`, `A quadrilateral whose all four vertices lie on the circumference of a single circle.`],
    ],
    formulas: [
      `Sum of angles in a polygon: (n - 2) * 180 degrees`,
      `Opposite angles of a cyclic quadrilateral sum to 180 degrees (supplementary).`,
      `Angle subtended by an arc at the center is double the angle subtended by it at any point on the remaining part of the circle.`,
    ],
    examples: [
      { q: `In a cyclic quadrilateral ABCD, angle A = 75 degrees. Find angle C.`, ans: `Since ABCD is cyclic, opposite angles are supplementary: angle A + angle C = 180.\n75 + angle C = 180 => angle C = 105 degrees.` },
      { q: `Show that two triangles are congruent by SAS rule if two sides and the included angle are equal.`, ans: `By SAS postulate, if side AB = PQ, angle B = angle Q, and side BC = QR, then triangle ABC is congruent to triangle PQR.` }
    ],
    hots: [
      { q: `Prove that the perpendicular from the center of a circle to a chord bisects the chord.`, ans: `Let AB be a chord of a circle with center O, and OM is perpendicular to AB.\nIn triangles OMA and OMB:\nOA = OB (radii of circle),\nOM = OM (common side),\nangle OMA = angle OMB = 90.\nBy RHS congruence, triangle OMA is congruent to triangle OMB.\nThus, AM = MB (CPCT).` }
    ],
    worksheet: [
      `State the Midpoint Theorem.`,
      `Find the sum of interior angles of a regular hexagon.`,
      `A chord of length 16 cm is at a distance of 6 cm from the center of the circle. Find the radius of the circle.`,
      `Prove that angles in the same segment of a circle are equal.`,
      `In a triangle ABC, if angles are in the ratio 2:3:5, find the measure of all angles.`
    ],
    applications: [
      [`Civil Engineering`, `Trusses in bridges use triangles to distribute tension and compression forces, ensuring architectural stability.`],
      [`Optics and Astronomy`, `Reflector telescope designs use parabolic geometry curves to focus incoming light rays to a single focal point.`],
    ],
  },
  5: {
    title: `Coordinate Geometry`,
    definitions: [
      [`Cartesian Plane`, `A coordinate system defined by a horizontal X-axis and vertical Y-axis intersecting at the origin (0, 0).`],
      [`Distance Formula`, `Analytical formula used to calculate the length of the straight line segment between two coordinate points.`],
      [`Section Formula`, `Finds the coordinates of a point that divides a line segment joining two points in a given ratio m:n.`],
      [`Centroid`, `The point where the three medians of a triangle intersect. It divides each median in the ratio 2:1.`],
    ],
    formulas: [
      `Distance: d = \u221A[(x2 - x1)^2 + (y2 - y1)^2]`,
      `Midpoint: M = ( (x1 + x2)/2, (y1 + y2)/2 )`,
      `Section Formula (Internal): P = ( (mx2 + nx1)/(m+n), (my2 + ny1)/(m+n) )`,
      `Centroid coordinates: G = ( (x1 + x2 + x3)/3, (y1 + y2 + y3)/3 )`,
    ],
    examples: [
      { q: `Find the distance between the points (3, -2) and (-1, 1).`, ans: `Apply distance formula: d = \u221A[(-1 - 3)^2 + (1 - (-2))^2]\nd = \u221A[(-4)^2 + (3)^2] = \u221A[16 + 9] = \u221A25 = 5 units.` },
      { q: `Find the centroid of the triangle with vertices (1, 3), (2, 7), and (12, -1).`, ans: `G = ( (1+2+12)/3, (3+7-1)/3 ) = ( 15/3, 9/3 ) = (5, 3).\nSo centroid is (5, 3).` }
    ],
    hots: [
      { q: `Find the coordinates of the point which divides the line segment joining (3, 5) and (8, 10) internally in the ratio 2:3.`, ans: `Given: x1=3, y1=5, x2=8, y2=10, m=2, n=3.\nx = (2*8 + 3*3)/(2+3) = (16+9)/5 = 25/5 = 5.\ny = (2*10 + 3*5)/(2+3) = (20+15)/5 = 35/5 = 7.\nPoint coordinates are (5, 7).` }
    ],
    worksheet: [
      `Calculate the midpoint of the segment joining (-4, 2) and (6, -8).`,
      `Show that the points (1, 1), (3, 4), and (5, 7) are collinear using distance formula.`,
      `Find the distance of the point (6, 8) from the origin.`,
      `If the centroid of a triangle is (2, 3) and two vertices are (1, 2) and (3, 5), find the third vertex.`,
      `Calculate the area of the triangle with vertices (0, 0), (3, 0), and (0, 4).`
    ],
    applications: [
      [`Mapping & Navigation`, `GPS coordinates represent latitude and longitude on a spherical model mapped onto a coordinate plane for path-finding.`],
      [`Computer Games`, `Game engines represent 2D/3D sprites as coordinate positions and translate/rotate them using matrix geometry arithmetic.`],
    ],
  },
  6: {
    title: `Trigonometry`,
    definitions: [
      [`Right-Angled Triangle`, `A triangle containing a 90-degree angle, forming the basis of trigonometric definitions.`],
      [`Trigonometric Ratios`, `Ratios of the sides of a right-angled triangle relative to an acute angle \u03B8.`],
      [`Complementary Angles`, `Two angles whose sum is exactly 90 degrees. Trigonometric ratios show key symmetric relationships here.`],
      [`Reciprocal Ratios`, `The inverse trigonometric ratios: cosec \u03B8, sec \u03B8, and cot \u03B8.`],
    ],
    formulas: [
      `sin \u03B8 = Opposite / Hypotenuse`,
      `cos \u03B8 = Adjacent / Hypotenuse`,
      `tan \u03B8 = Opposite / Adjacent = sin \u03B8 / cos \u03B8`,
      `Complementary rules: sin(90 - \u03B8) = cos \u03B8 | cos(90 - \u03B8) = sin \u03B8`,
      `Reciprocal relationships: cosec \u03B8 = 1/sin \u03B8 | sec \u03B8 = 1/cos \u03B8`,
    ],
    examples: [
      { q: `In a right triangle ABC, opposite side = 3 cm, adjacent side = 4 cm. Find sin \u03B8 and cos \u03B8.`, ans: `Find hypotenuse using Pythagoras: hyp = \u221A(3^2 + 4^2) = \u221A25 = 5 cm.\nsin \u03B8 = 3/5 = 0.6\ncos \u03B8 = 4/5 = 0.8.` },
      { q: `Evaluate sin 30 degrees + cos 60 degrees.`, ans: `Recall values: sin 30 = 1/2, cos 60 = 1/2.\nSum = 1/2 + 1/2 = 1.` }
    ],
    hots: [
      { q: `If tan \u03B8 = 15/8, find all other trigonometric ratios of \u03B8.`, ans: `Given opposite = 15, adjacent = 8.\nhyp = \u221A(15^2 + 8^2) = \u221A(225 + 64) = \u221A289 = 17.\nsin \u03B8 = 15/17, cos \u03B8 = 8/17.\ncosec \u03B8 = 17/15, sec \u03B8 = 17/8, cot \u03B8 = 8/15.` }
    ],
    worksheet: [
      `Find cot \u03B8 if tan \u03B8 = 4/3.`,
      `State the values of sin 45, cos 45, and tan 45.`,
      `Verify if cos(90 - 30) = sin 30.`,
      `Simplify: (sin^2 \u03B8 + cos^2 \u03B8).`,
      `Find sec \u03B8 if cos \u03B8 = 1/\u221A2.`
    ],
    applications: [
      [`Oceanography`, `Trigonometric equations help calculate wave heights, high tide peaks, and sea current speeds based on astronomical alignments.`],
      [`Architecture & Surveying`, `Land surveyors use trigonometry (triangulation) to measure mountain heights and build vertical truss structures.`],
    ],
  },
  7: {
    title: `Mensuration`,
    definitions: [
      [`Heron's Formula`, `A formula to calculate the area of any triangle when the lengths of all three sides are known.`],
      [`Cuboid`, `A three-dimensional solid shape with six rectangular faces, opposite faces being equal.`],
      [`Cube`, `A three-dimensional solid shape with six equal square faces, all edges sharing the same length.`],
      [`Volume`, `The amount of space occupied by a three-dimensional object, measured in cubic units.`],
    ],
    formulas: [
      `Heron's Area: Area = \u221A[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2`,
      `TSA of Cuboid: 2(lh + wh + lw)`,
      `Volume of Cuboid: l * w * h`,
      `TSA of Cube: 6a^2 | Volume of Cube: a^3`,
      `LSA of Cuboid: 2h(l + w) | LSA of Cube: 4a^2`,
    ],
    examples: [
      { q: `Find the area of a triangle whose sides are 5 cm, 12 cm, and 13 cm.`, ans: `Calculate semi-perimeter: s = (5 + 12 + 13)/2 = 30/2 = 15 cm.\nArea = \u221A[15(15-5)(15-12)(15-13)] = \u221A[15 * 10 * 3 * 2] = \u221A900 = 30 cm\u00B2.` },
      { q: `Find the volume of a cuboid of dimensions 10 cm x 8 cm x 5 cm.`, ans: `Volume = l * w * h = 10 * 8 * 5 = 400 cm\u00B3.` }
    ],
    hots: [
      { q: `A cuboidal container of dimensions 6 m x 5 m x 4 m is full of water. If it is emptied into a cubical tank of side 5 m, will the water overflow? Find the remaining volume capacity.`, ans: `Volume of cuboid container = 6 * 5 * 4 = 120 m\u00B3.\nVolume of cubical tank = 5^3 = 125 m\u00B3.\nSince 120 m\u00B3 < 125 m\u00B3, the water will NOT overflow.\nRemaining volume capacity = 125 - 120 = 5 m\u00B3.` }
    ],
    worksheet: [
      `Find the TSA of a cube of edge 4 cm.`,
      `Find the area of an equilateral triangle of side 6 cm using Heron's formula.`,
      `Calculate the LSA of a cuboid of dimensions 12 cm x 10 cm x 8 cm.`,
      `Find the volume of a cube whose TSA is 96 cm\u00B2.`,
      `Convert 1 cubic meter to liters (Recall: 1 m\u00B3 = 1000 liters).`
    ],
    applications: [
      [`Packaging Industry`, `Manufacturers use surface area calculations to minimize paperboard waste when designing boxes for shipping.`],
      [`Water Management`, `Civil engineers compute volumes of reservoirs and concrete tanks to ensure local municipalities have adequate water reserves.`],
    ],
  },
  8: {
    title: `Statistics`,
    definitions: [
      [`Primary Data`, `Data collected directly from first-hand sources by the investigator for a specific research purpose.`],
      [`Arithmetic Mean`, `The average value of a set of numbers, calculated by dividing the sum of all terms by their count.`],
      [`Median`, `The middle value in an ordered set of data, separating the higher half from the lower half.`],
      [`Mode`, `The value that appears most frequently in a given dataset. A dataset can have one mode, multiple, or none.`],
    ],
    formulas: [
      `Arithmetic Mean (Ungrouped): Mean = \u2211x / n`,
      `Mean (Grouped Direct): Mean = \u2211fx / \u2211f`,
      `Median (n is odd): term at index (n + 1)/2`,
      `Median (n is even): average of terms at index n/2 and (n/2) + 1`,
    ],
    examples: [
      { q: `Find the mean of the numbers: 2, 4, 6, 8, 10.`, ans: `Sum of numbers = 2 + 4 + 6 + 8 + 10 = 30.\nCount n = 5.\nMean = 30 / 5 = 6.` },
      { q: `Find the median of the data: 12, 18, 13, 21, 15.`, ans: `First arrange in ascending order: 12, 13, 15, 18, 21.\nn = 5 (odd).\nMedian = term at (5+1)/2 = 3rd term = 15.` }
    ],
    hots: [
      { q: `The mean of 5 numbers is 20. If one number is excluded, the mean becomes 18. Find the excluded number.`, ans: `Sum of 5 numbers = 5 * 20 = 100.\nSum of 4 numbers = 4 * 18 = 72.\nExcluded number = Sum of 5 - Sum of 4 = 100 - 72 = 28.` }
    ],
    worksheet: [
      `Calculate the mean of first five prime numbers.`,
      `Find the mode of the data: 2, 3, 5, 3, 7, 3, 9, 5.`,
      `Distinguish between primary and secondary data.`,
      `Find the median of the numbers: 5, 8, 12, 16, 22, 28 (n is even).`,
      `Construct a frequency distribution table for the marks of 10 students: 5, 6, 5, 7, 8, 5, 6, 7, 8, 9.`
    ],
    applications: [
      [`Census Statistics`, `Governments use statistical means and demographics data to plan local education budgets and public infrastructure.`],
      [`Manufacturing Quality Control`, `Factories analyze production statistics distributions to monitor assembly lines and avoid product defects.`],
    ],
  },
  9: {
    title: `Probability`,
    definitions: [
      [`Random Experiment`, `An experiment where the outcomes are known, but the exact outcome of a specific trial cannot be predicted.`],
      [`Sample Space`, `The set of all possible outcomes of a random experiment, denoted by S.`],
      [`Event`, `A subset of the sample space S, representing a specific outcome or combination of outcomes.`],
      [`Complementary Event`, `The event representing the non-occurrence of event A, denoted by A', where P(A) + P(A') = 1.`],
    ],
    formulas: [
      `Probability of Event E: P(E) = n(E) / n(S)`,
      `Probability bounds: 0 \u2264 P(E) \u2264 1`,
      `P(impossible event) = 0 | P(sure event) = 1`,
      `Complement relation: P(E') = 1 - P(E)`,
    ],
    examples: [
      { q: `A fair coin is tossed once. Find the probability of getting a Head.`, ans: `Sample space S = {H, T} => n(S) = 2.\nEvent E (getting head) = {H} => n(E) = 1.\nP(E) = n(E)/n(S) = 1/2 = 0.5.` },
      { q: `A die is thrown. Find the probability of getting an even number.`, ans: `Sample space S = {1, 2, 3, 4, 5, 6} => n(S) = 6.\nEven numbers E = {2, 4, 6} => n(E) = 3.\nP(E) = 3/6 = 1/2 = 0.5.` }
    ],
    hots: [
      { q: `Two fair coins are tossed simultaneously. Find the probability of getting at least one Head.`, ans: `Sample space S = {HH, HT, TH, TT} => n(S) = 4.\nAt least one Head E = {HH, HT, TH} => n(E) = 3.\nP(E) = n(E)/n(S) = 3/4 = 0.75.` }
    ],
    worksheet: [
      `Write the sample space when a single die is rolled.`,
      `Find the probability of drawing a red card from a standard deck of 52 cards.`,
      `What is the probability of a sure event?`,
      `If P(A) = 0.65, find P(A').`,
      `A bag contains 5 red and 3 blue balls. Find the probability of drawing a blue ball.`
    ],
    applications: [
      [`Weather Forecasting`, `Weather systems probability models are used to calculate the probability of rain.`],
      [`Insurance Risk`, `Probability values are calculated to set premiums for risk management.`],
    ],
  },
};

export const science9Data: Record<number, ChapterContent> = {
  1: {
    title: `Physics`,
    definitions: [
      [`Physical Quantity`, `A quantity that can be measured and in terms of which laws of physics can be described.`],
      [`Fundamental Units`, `The units of fundamental quantities like meter (m), kilogram (kg), second (s), kelvin (K), ampere (A), mole (mol), candela (cd).`],
      [`Displacement`, `The shortest distance measured between the initial position and final position of a moving body in a particular direction.`],
      [`Acceleration`, `The rate of change of velocity with respect to time, measured in m/s^2. Formula: a = (v - u) / t.`],
      [`Inertia`, `The natural tendency of an object to resist any change in its state of rest or uniform motion.`],
      [`Force`, `An external agent that changes or tends to change the state of rest or uniform motion of a body. SI unit: Newton (N).`],
    ],
    formulas: [
      `Equations of motion: v = u + at | s = ut + (1/2)at^2 | v^2 = u^2 + 2as`,
      `Force: F = m * a (Newton's Second Law)`,
      `Gravitation: F = G * (m1 * m2) / r^2 where G = 6.674 x 10^-11 N m^2/kg^2`,
      `Work: W = F * d * cos \u03B8`,
      `Kinetic Energy: KE = (1/2)mv^2 | Potential Energy: PE = mgh`,
      `Sound: v = f * \u03BB (velocity = frequency * wavelength)`,
    ],
    examples: [
      { q: `A car accelerates uniformly from rest (u = 0) to 20 m/s in 5 seconds. Find the acceleration and distance covered.`, ans: `u = 0, v = 20, t = 5.\nUsing v = u + at: 20 = 0 + a*5 => a = 4 m/s\u00B2.\nUsing s = ut + (1/2)at\u00B2: s = 0 + (1/2)*4*(5)^2 = 50 m.` },
      { q: `Calculate the kinetic energy of an object of mass 10 kg moving with a velocity of 5 m/s.`, ans: `m = 10, v = 5.\nKE = (1/2)mv\u00B2 = (1/2)*10*(5)^2 = 5 * 25 = 125 Joules.` }
    ],
    hots: [
      { q: `A ball is thrown vertically upward with an initial velocity of 30 m/s. Calculate (i) the maximum height reached and (ii) the time taken to return to the starting point. (g = 10 m/s\u00B2)`, ans: `At max height, final velocity v = 0.\n(i) v\u00B2 = u\u00B2 - 2gs => 0 = 30^2 - 2(10)s => 20s = 900 => s = 45 m.\n(ii) v = u - gt => 0 = 30 - 10t => t = 3 s (time to reach top).\nTotal time to return = 2 * 3 = 6 seconds.` }
    ],
    worksheet: [
      `State the SI unit of force and define it.`,
      `Differentiate between distance and displacement with examples.`,
      `A body of mass 5 kg is acted upon by a force of 20 N. Find its acceleration.`,
      `State the law of conservation of energy.`,
      `What is ultrasound and state one application of SONAR.`
    ],
    applications: [
      [`Space Exploration`, `ISRO uses equations of motion and gravitation laws to compute rocket launch trajectories and satellite orbital paths.`],
      [`Automobile Safety`, `Car seatbelts and airbags utilize inertia principles to minimize impact force on passengers during sudden braking.`],
    ],
  },
  2: {
    title: `Chemistry`,
    definitions: [
      [`Matter`, `Anything that occupies space and has mass, existing as solids, liquids, or gases.`],
      [`Element`, `A pure substance made of only one type of atom that cannot be broken down chemically.`],
      [`Compound`, `A substance formed by chemical combination of two or more elements in a fixed mass ratio.`],
      [`Atom`, `The smallest unit of matter that retains the chemical properties of an element.`],
      [`Valency`, `The combining capacity of an atom, determined by outer valence shell electrons.`],
      [`Mole`, `The SI unit of amount of substance, containing 6.022 x 10^23 particles (Avogadro's Number).`],
    ],
    formulas: [
      `Number of moles (n) = Given Mass (g) / Molar Mass (g/mol)`,
      `Maximum electrons in shell n = 2n^2 (Bohr-Bury scheme)`,
      `Electron orbits capacity: K = 2, L = 8, M = 18, N = 32`,
      `Atomicity = Number of atoms present in one molecule of an element`,
    ],
    examples: [
      { q: `Calculate the number of moles in 46 g of Sodium (Na). (Atomic mass of Na = 23)`, ans: `Number of moles = Given mass / Molar mass.\nn = 46 / 23 = 2 moles.` },
      { q: `Write the electronic configuration of Chlorine (Z = 17) and find its valency.`, ans: `Z = 17 => configuration: K=2, L=8, M=7.\nChlorine needs 1 electron to complete its octet (8 in outer shell).\nSo valency = 1.` }
    ],
    hots: [
      { q: `An element X has atomic number 12. Predict: (i) its electronic configuration, (ii) its valency, (iii) whether it is a metal or non-metal, and (iv) the type of bond it forms with Chlorine.`, ans: `Z = 12 => configuration is 2, 8, 2.\n(i) Configuration: 2, 8, 2.\n(ii) Valency = 2 (loses 2 electrons to form X^2+).\n(iii) Metal (as it readily loses valence electrons).\n(iv) Forms an ionic bond (transfers electrons to Cl) to form XCl2 (MgCl2).` }
    ],
    worksheet: [
      `Differentiate between elements, compounds, and mixtures.`,
      `Calculate the molar mass of Calcium Carbonate (CaCO3) [Ca=40, C=12, O=16].`,
      `State the postulates of John Dalton's atomic theory.`,
      `Draw the Bohr model shell diagram for Oxygen (Z = 8).`,
      `What is the difference between an ionic bond and a covalent bond?`
    ],
    applications: [
      [`Water Treatment`, `Sedimentation, filtration, and chemical chlorination mixtures are applied in municipal plants to provide clean drinking water.`],
      [`Pharmaceuticals`, `Pharmacists use the mole concept to measure exact reagent masses when synthesizing chemical drug formulations.`],
    ],
  },
  3: {
    title: `Biology`,
    definitions: [
      [`Cell`, `The basic structural and functional unit of all living organisms, discovered by Robert Hooke in 1665.`],
      [`Prokaryotic Cell`, `A cell lacking a nuclear membrane and membrane-bound organelles (e.g. Bacteria).`],
      [`Eukaryotic Cell`, `A cell possessing a well-defined nucleus and membrane-bound organelles (e.g. Plant and Animal cells).`],
      [`Tissue`, `A group of cells similar in structure that work together to perform a specific physiological function.`],
      [`Pathogen`, `A disease-causing organism, such as a bacterium, virus, fungus, or protozoan.`],
      [`Immunity`, `The body's ability to resist and fight off infections through the immune system.`],
    ],
    formulas: [
      `Cell Theory: (1) All organisms are made of cells, (2) Cell is basic unit of life, (3) Cells come from pre-existing cells.`,
      `Plant unique features: Cell wall (cellulose), chloroplasts, large central vacuole.`,
      `Animal unique features: Centrosomes, lysosomes, no cell wall.`,
      `Whittaker's 5 Kingdoms: Monera, Protista, Fungi, Plantae, Animalia.`,
    ],
    examples: [
      { q: `List three primary differences between a plant cell and an animal cell.`, ans: `Plant cell: Cell wall present, plastids/chloroplasts present, large central vacuole.\nAnimal cell: No cell wall, no plastids, small temporary vacuoles.` },
      { q: `Classify the following into their Whittaker kingdoms: E. coli, Amoeba, Mushroom, Fern.`, ans: `E. coli: Monera (prokaryotic, unicellular).\nAmoeba: Protista (eukaryotic, unicellular).\nMushroom: Fungi (multicellular, heterotrophic with chitin cell wall).\nFern: Plantae (multicellular, autotrophic).` }
    ],
    hots: [
      { q: `A student observes a plant slide containing dead cells with very thick lignified cell walls and no intercellular spaces. Identify the tissue type, its location, and function.`, ans: `The tissue is Sclerenchyma (a simple permanent tissue).\nLocation: Found in the husk of coconut, seed coats, veins of leaves.\nFunction: Provides mechanical strength, stiffness, and rigidity to plant parts.` }
    ],
    worksheet: [
      `Draw a plant cell and label the cell wall, nucleus, and vacuole.`,
      `Differentiate between meristematic and permanent plant tissues.`,
      `Name two diseases caused by viruses and two caused by bacteria.`,
      `State the functions of Xylem and Phloem in plants.`,
      `Describe the principles of acquired immunity and vaccination.`
    ],
    applications: [
      [`Medical Immunisation`, `Understanding pathogens and acquired immunity led to vaccine developments protecting global populations from polio and measles.`],
      [`Agricultural Botany`, `Knowledge of plant vascular tissues (Xylem/Phloem) aids in grafting and optimizing tissue culture crops yields.`],
    ],
  },
};


// ==================== LOOKUP FUNCTION ====================

/**
 * Resolve curriculum content for a given class, subject, and chapter.
 * Returns null if no data is available (falls back to generic).
 */

// ==================== TOPIC-SPECIFIC CLASS 9 SCIENCE ====================

export const science9PhysicsTopics: Record<number, ChapterContent> = {
  1: {
    title: `Measurement`,
    definitions: [
      [`Physical Quantity`, `A quantity that can be measured and in terms of which laws of physics can be described, consisting of a numerical value and a unit.`],
      [`Fundamental Quantities`, `Quantities that cannot be expressed in terms of any other physical quantities, such as length, mass, time, temperature, electric current, luminous intensity, and amount of substance.`],
      [`Derived Quantities`, `Quantities that can be expressed in terms of fundamental quantities, like area, volume, velocity, acceleration, force, and pressure.`],
      [`Unit`, `The standard measure of a physical quantity used for comparison, such as metre, kilogram, or second.`],
      [`Fundamental Units`, `The units of fundamental quantities, defined independently (e.g., metre for length, kilogram for mass, second for time).`],
      [`Derived Units`, `The units used to measure derived quantities, expressed as combinations of fundamental units (e.g., m/s for velocity, kg/m³ for density).`],
      [`Metre`, `The SI base unit of length, defined as the distance travelled by light in vacuum during a time interval of 1/299,792,458 of a second.`],
      [`Kilogram`, `The SI base unit of mass, defined by taking the fixed numerical value of the Planck constant h to be 6.62607015 x 10⁻³⁴ when expressed in J s.`],
      [`Second`, `The SI base unit of time, defined by taking the fixed numerical value of the caesium frequency Δν_Cs to be 9,192,631,770 when expressed in Hz.`],
      [`Kelvin`, `The SI base unit of thermodynamic temperature, defined by taking the fixed numerical value of the Boltzmann constant k to be 1.380649 x 10⁻²³ when expressed in J K⁻¹.`],
      [`Astronomical Unit`, `The mean distance between the center of the Earth and the center of the Sun, equal to 1.496 x 10¹¹ metres.`],
      [`Light Year`, `The distance travelled by light in vacuum in one year, equal to 9.46 x 10¹⁵ metres.`],
      [`Parsec`, `Parallactic second, defined as the distance at which an arc of length 1 astronomical unit subtends an angle of one second of arc, equal to 3.08 x 10¹⁶ metres.`],
      [`Least Count`, `The smallest value that can be measured accurately with a given measuring instrument (e.g., 0.1 mm for Vernier calipers, 0.01 mm for screw gauges).`],
      [`Zero Error`, `The error in a measuring instrument when the zero mark of the measuring scale does not coincide with the reference zero index line under no-load conditions.`],
      [`Pitch`, `The distance travelled by the spindle of a screw gauge per one complete rotation of the thimble / head scale.`],
      [`Vernier Scale`, `A small, auxiliary graduated scale that slides along the main scale of an instrument, allowing readings to a fraction of a division.`],
      [`Screw Gauge`, `A high-precision instrument used to measure dimensions in the millimetre range, such as wire diameter or metal sheet thickness, using a fine pitch screw.`],
      [`Spring Balance`, `A device used to measure the weight of an object based on Hooke's Law, which states that the stretch of a spring is proportional to the force applied.`]
    ],
    formulas: [
      `Least Count of Vernier Caliper (LC) = 1 Main Scale Division (MSD) - 1 Vernier Scale Division (VSD) = 0.1 mm = 0.01 cm`,
      `Vernier Total Reading (TR) = Main Scale Reading (MSR) + (Vernier Coincidence (VC) * LC) \u00B1 Zero Correction`,
      `Zero Correction (ZC) = - (Zero Error)`,
      `Least Count of Screw Gauge (LC) = Pitch / Number of Head Scale Divisions = 1 mm / 100 = 0.01 mm = 0.001 cm`,
      `Pitch of Screw Gauge = Distance moved on Pitch Scale / Number of complete rotations`,
      `Screw Gauge Total Reading (TR) = Pitch Scale Reading (PSR) + (Head Scale Coincidence (HSC) * LC) \u00B1 Zero Correction`,
      `Weight of a body (W) = Mass (m) * Acceleration due to gravity (g) | W = m * g (where g \u2248 9.8 m/s\u00B2 on Earth)`,
      `Astronomical Unit (1 AU) = 1.496 x 10^11 m`,
      `Light Year (1 ly) = 9.46 x 10^15 m`,
      `Parsec (1 pc) = 3.08 x 10^16 m`,
      `Density (\u03C1) = Mass (m) / Volume (V)`
    ],
    examples: [
      { q: `A Vernier caliper has a main scale reading of 4.5 cm and a Vernier coincidence of 6. If the positive zero error is 0.03 cm, calculate the corrected reading.`, ans: `Given:\nMSR = 4.5 cm\nVC = 6\nLC = 0.01 cm\nZero Error = +0.03 cm\nZero Correction (ZC) = -0.03 cm\n\nFormula:\nTR = MSR + (VC * LC) + ZC\n\nCalculation:\nTR = 4.5 + (6 * 0.01) - 0.03\nTR = 4.5 + 0.06 - 0.03\nTR = 4.53 cm.` },
      { q: `A screw gauge has a pitch of 1 mm and 100 divisions on its head scale. The thimble shows a pitch scale reading of 3 mm and head scale coincidence of 45. Find the corrected reading if the instrument has a negative zero error of 0.04 mm.`, ans: `Given:\nPitch = 1 mm\nHead scale divisions = 100\nLC = Pitch / 100 = 0.01 mm\nPSR = 3 mm\nHSC = 45\nZero Error = -0.04 mm\nZero Correction (ZC) = +0.04 mm\n\nFormula:\nTR = PSR + (HSC * LC) + ZC\n\nCalculation:\nTR = 3 mm + (45 * 0.01 mm) + 0.04 mm\nTR = 3 + 0.45 + 0.04\nTR = 3.49 mm.` },
      { q: `Convert an astronomical distance of 2.5 light years into standard SI units (meters).`, ans: `Given:\nDistance = 2.5 light years (ly)\n1 light year = 9.46 x 10^15 m\n\nFormula:\nDistance in meters = Distance in ly * (9.46 x 10^15 m/ly)\n\nCalculation:\nDistance = 2.5 * 9.46 x 10^15\nDistance = 23.65 x 10^15 m = 2.365 x 10^16 m.` }
    ],
    hots: [
      { q: `Why are astronomical distances expressed in light years or parsecs instead of standard SI units like meters?`, ans: `Astronomical distances (e.g. between stars and galaxies) are incredibly large. Writing them in meters yields extremely large numbers (e.g. Earth to Sun is 149,600,000,000 meters) which are prone to clerical and calculation errors. Light years (distance traveled by light in a year) and parsecs simplify these numbers to manageable quantities.` },
      { q: `A spring balance calibrated on Earth is taken to the Moon to measure the mass and weight of a rock. Explain how the readings of the spring balance will change.`, ans: `A spring balance measures weight (gravitational force, W = m * g) rather than mass. Since acceleration due to gravity on the Moon (g_moon \u2248 1.63 m/s\u00B2) is 1/6th of that on Earth (g_earth \u2248 9.8 m/s\u00B2), the weight reading on the spring balance will decrease to 1/6th of its Earth value. The rock's actual mass remains unchanged, but a spring balance cannot measure mass directly without recalibration.` }
    ],
    worksheet: [
      `Differentiate between fundamental and derived physical quantities, giving three examples of each.`,
      `State the rules for writing SI units and their symbols (capitalization, plurals, punctuation) as specified by BIPM.`,
      `A screw gauge has a PSR of 3 mm and HSC of 42. If it has a negative zero error of 5 divisions, find the thickness of the wire.`,
      `What is the difference between physical balance and digital balance in terms of sensitivity and accuracy?`,
      `Why is a degree sign omitted when writing temperatures in Kelvin (e.g., 273 K, not 273 \u00B0K)?`,
      `A Vernier caliper has 10 divisions on the Vernier scale which coincide with 9 divisions on the main scale (1 division = 1 mm). If the jaws are closed and the Vernier zero is to the left of the main scale zero by 2 divisions, calculate the zero error and zero correction.`
    ],
    applications: [
      [`Scientific Laboratories`, `Vernier calipers and screw gauges are standard instruments to measure the diameters of spherical lenses, capillaries, and wires with high precision.`],
      [`Aviation and Space Navigation`, `Astronomical units and light years are used to coordinate orbits, rocket vectors, and deep space telemetry without rounding errors.`],
      [`Metallurgical and Wire Manufacturing Industry`, `Used to gauge wire thicknesses, sheet metal profiles, and precision components in machining and aerospace fabrication to ensure tolerances.`]
    ],
  },
  2: {
    title: `Motion`,
    definitions: [
      [`Rest`, `An object is at rest if it does not change its position with respect to its surroundings. Example: A book on a table, walls of a room.`],
      [`Motion`, `An object is in motion if it changes its position with respect to its surroundings. Example: Cars on a road, rotating fan.`],
      [`Relativity of Motion`, `Motion is a relative phenomenon; an object can appear to be in motion to one observer and at rest to another depending on the frame of reference.`],
      [`Distance`, `The actual length of the path travelled by a moving body, irrespective of direction. It is a scalar quantity (SI unit: m).`],
      [`Displacement`, `The change in position of a moving body in a particular direction, representing the shortest distance between initial and final points. It is a vector quantity (SI unit: m).`],
      [`Speed`, `The rate of change of distance or distance travelled per unit time. It is a scalar quantity (SI unit: m/s).`],
      [`Velocity`, `The rate of change of displacement or displacement per unit time. It is a vector quantity (SI unit: m/s).`],
      [`Acceleration`, `The rate of change of velocity; change in velocity per unit time. It is a vector quantity (SI unit: m/s²).`],
      [`Centripetal Force`, `The force causing centripetal acceleration, acting on a body in circular motion and directed radially towards the center (F = mv²/r).`],
      [`Centrifugal Force`, `An apparent outward force experienced by a body moving in a circular path, acting away from the center (fictitious/pseudo force arising from inertia).`],
    ],
    formulas: [
      `Average Speed = Total Distance travelled / Total Time taken`,
      `Velocity = Displacement / Time taken`,
      `Acceleration: a = (v - u) / t`,
      `First Equation of Motion: v = u + at`,
      `Second Equation of Motion: s = ut + (1/2)at²`,
      `Third Equation of Motion: v² = u² + 2as`,
      `Free Fall Equations (u=0): v = gt | s = (1/2)gt² | v² = 2gh`,
      `Uniform Circular Motion Speed: v = (2 * \u03C0 * r) / T`,
      `Centripetal Acceleration: a = v²/r`,
      `Centripetal Force: F = m * a = (m * v²) / r`,
    ],
    examples: [
      { q: `A train starting from rest accelerates uniformly to a velocity of 36 km/h in 10 seconds. Find its acceleration in SI units.`, ans: `Convert velocity to m/s: u = 0 m/s, v = 36 km/h = 36 * (5/18) = 10 m/s.\nTime t = 10 s.\nApply v = u + at:\n10 = 0 + a*10 => a = 1 m/s\u00B2.` },
      { q: `A cyclist rides around a circular track of radius 40 m in 40 seconds. Calculate her speed.`, ans: `Given: r = 40 m, T = 40 s.\nSpeed v = (2 * \u03C0 * r) / T = (2 * 3.1416 * 40) / 40 = 2 * 3.1416 = 6.28 m/s.` }
    ],
    hots: [
      { q: `Can an object have a constant speed but changing velocity? Give an example and explain.`, ans: `Yes. An object undergoing Uniform Circular Motion has a constant speed, but its velocity is constantly changing because its direction of motion is changing at every instant. This directional change constitutes an acceleration, directed toward the center (centripetal acceleration).` },
      { q: `If an object returns to its starting point after travelling a certain distance, what can you say about its distance and displacement?`, ans: `If the object returns to its starting point, its displacement is zero because the shortest distance between its initial and final positions is zero. However, the distance travelled is not zero, as it equals the actual length of the path traversed.` }
    ],
    worksheet: [
      `Differentiate between distance and displacement with examples.`,
      `Classify uniform and non-uniform motion and give real-life examples of each.`,
      `Distinguish between speed and velocity.`,
      `Deduce the three equations of motion from velocity-time graphs.`,
      `Identify centripetal and centrifugal forces in daily life and state their directions.`
    ],
    applications: [
      [`Automotive Telemetry`, `Speedometers measure instantaneous speed while GPS systems use velocity vectors to calculate real-time traffic and arrival times.`],
      [`Industrial Separation (Centrifugation)`, `Spin dryers in washing machines and blood separators in clinical labs utilize centrifugal force to separate liquid droplets/elements from solid matrices.`],
    ],
  },
  3: {
    title: `Force and Laws of Motion`,
    definitions: [
      [`Inertia`, `The inherent property of a body to resist any change in its state of rest or uniform motion in a straight line, unless acted upon by an external force.`],
      [`Momentum`, `The quantity of motion contained in a body, measured as the product of its mass and velocity. SI unit: kg m/s.`],
      [`Impulse`, `A large force acting on a body for a very short interval of time, equal to the change in momentum. SI unit: N s or kg m/s.`],
      [`Balanced Forces`, `When a set of forces acting on a body does not change its state of rest or uniform motion, yielding a net force of zero.`],
      [`Friction`, `The opposing force that comes into play at the contact surface when one body slides or rolls over another.`],
    ],
    formulas: [
      `Linear Momentum: p = m * v`,
      `Newton's Second Law: Force (F) = mass (m) * acceleration (a)`,
      `Impulse (J) = Force (F) * time (t) = change in momentum (m*v - m*u)`,
      `Law of Conservation of Momentum: m1*u1 + m2*u2 = m1*v1 + m2*v2`,
    ],
    examples: [
      { q: `A force of 15 N acts on a body of mass 3 kg. Find the acceleration produced.`, ans: `Given: F = 15 N, m = 3 kg.\nUsing F = m * a:\n15 = 3 * a => a = 5 m/s\u00B2.` },
      { q: `Calculate the change in momentum of a 0.5 kg ball moving at 20 m/s that is hit back along the same path at 15 m/s.`, ans: `Given: m = 0.5 kg, u = 20 m/s, v = -15 m/s (opposite direction).\nChange in momentum = m*v - m*u = 0.5 * (-15) - 0.5 * 20\n= -7.5 - 10 = -17.5 kg m/s.` }
    ],
    hots: [
      { q: `Why does a high jumper land on a cushion or a sand bed rather than concrete floor?`, ans: `By landing on a cushion or sand, the time interval of impact (t) increases significantly. Since Impulse (change in momentum) is constant, increasing the duration decreases the average force (F = J / t) exerted on the athlete's body, preventing severe fractures.` }
    ],
    worksheet: [
      `State Newton's three laws of motion with daily life examples.`,
      `Define 1 Newton of force.`,
      `Show that Newton's First Law is also called the Law of Inertia, explaining its three types.`,
      `A bullet of mass 20 g is fired with a velocity of 150 m/s from a pistol of mass 2 kg. Calculate the recoil velocity of the pistol.`,
      `State and prove the Law of Conservation of Momentum.`
    ],
    applications: [
      [`Safety Equipment`, `Vehicular crumple zones, seat belts, and airbags are designed to collapse slowly during collisions, lowering impact forces by extending time.`],
      [`Athletic Shoe Design`, `Sneakers incorporate gel or foam soles to reduce peak impact forces on joints during running.`],
    ],
  },
  4: {
    title: `Gravitation`,
    definitions: [
      [`Universal Law of Gravitation`, `Every particle in the universe attracts every other particle with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them.`],
      [`Acceleration due to Gravity (g)`, `The acceleration produced in a body due to the gravitational pull of the Earth. Its average value at the surface is 9.8 m/s^2.`],
      [`Mass`, `The quantity of matter contained in a body, which is a scalar quantity and remains constant everywhere in the universe.`],
      [`Weight`, `The gravitational force acting on a body towards the center of the Earth, which is a vector quantity and varies with location.`],
      [`Escape Velocity`, `The minimum velocity required for a body to escape the gravitational field of a planet and enter outer space.`],
    ],
    formulas: [
      `Newton's Gravitational Force: F = G * (m1 * m2) / d^2`,
      `Universal Gravitational Constant: G = 6.674 x 10^-11 N m^2/kg^2`,
      `Relation between g and G: g = (G * M) / R^2`,
      `Weight of a body: W = m * g`,
      `Apparent Weight in Elevator (moving up with acceleration a): W = m(g + a)`,
      `Apparent Weight in Elevator (moving down with acceleration a): W = m(g - a)`,
    ],
    examples: [
      { q: `Calculate the gravitational force between Earth (M = 6 x 10^24 kg) and a 1 kg object on its surface (R = 6.4 x 10^6 m).`, ans: `F = G * M * m / R²\nF = (6.67 x 10^-11) * (6 x 10^24) * 1 / (6.4 x 10^6)²\nF = 40.02 x 10^13 / 4.096 x 10^13 = 9.77 Newtons (close to 9.8 N).` },
      { q: `An object weighs 60 N on Earth. What is its mass and weight on the Moon? (Moon gravity is 1/6th of Earth gravity).`, ans: `Mass on Earth = W / g = 60 / 9.8 \u2248 6.12 kg. Mass remains constant, so mass on Moon = 6.12 kg.\nWeight on Moon = Weight on Earth / 6 = 60 / 6 = 10 N.` }
    ],
    hots: [
      { q: `Why does acceleration due to gravity (g) vary at different latitudes on Earth, being maximum at the poles and minimum at the equator?`, ans: `The Earth is not a perfect sphere but an oblate spheroid. The polar radius is about 21 km shorter than the equatorial radius. Since g = GM / R^2, and R is smaller at the poles, g is larger. Rotation of the Earth also generates centrifugal forces that counter gravity slightly at the equator.` }
    ],
    worksheet: [
      `State the universal law of gravitation and explain its significance.`,
      `Compare and contrast mass and weight.`,
      `Explain how Kepler's three laws describe planetary motion.`,
      `What is weightlessness? Explain the apparent weight of a person in a free-falling elevator.`,
      `If the distance between two masses is doubled, how does the gravitational force change?`
    ],
    applications: [
      [`Satellite Technology`, `Orbital launch speeds and orbits of communications satellites are determined using gravitational balancing equations.`],
      [`Tide Modeling`, `High and low ocean tides are calculated based on the gravitational pull vectors of the Moon and the Sun on Earth's oceans.`],
    ],
  },
  5: {
    title: `Work, Power and Energy`,
    definitions: [
      [`Work`, `Work is said to be done by a force when the force produces displacement in the body in the direction of the force. SI unit: Joule (J).`],
      [`Energy`, `The capacity to do work, which exists in various forms and can be converted from one form to another. SI unit: Joule (J).`],
      [`Kinetic Energy`, `The energy possessed by a body by virtue of its motion, proportional to its mass and the square of its speed.`],
      [`Potential Energy`, `The energy possessed by a body by virtue of its position, shape, or configuration relative to a conservative field.`],
      [`Power`, `The rate of doing work or rate of energy transfer. SI unit: Watt (W) = 1 Joule/second.`],
    ],
    formulas: [
      `Work: W = F * s * cos \u03B8`,
      `Kinetic Energy: KE = (1/2) * m * v^2`,
      `Gravitational Potential Energy: PE = m * g * h`,
      `Power: P = Work / time = W / t = F * v`,
      `Mechanical Energy conservation: Total Energy (E) = KE + PE = constant`,
      `1 Horsepower (HP) = 746 Watts`,
    ],
    examples: [
      { q: `A porter lifts a suitcase of 15 kg from the ground and puts it on his head 1.5 m above the ground. Calculate the work done.`, ans: `Given: m = 15 kg, h = 1.5 m, g = 9.8 m/s\u00B2.\nWork done W = m*g*h = 15 * 9.8 * 1.5 = 220.5 Joules.` },
      { q: `An electric motor of 2 HP runs for 10 seconds. Calculate the electrical work done.`, ans: `Power in Watts = 2 * 746 = 1492 W.\nWork done W = Power * time = 1492 * 10 = 14920 Joules.` }
    ],
    hots: [
      { q: `A heavy box is pushed against a wall, and the pusher becomes exhausted but the box does not move. Has any mechanical work been done? Explain.`, ans: `No. Mechanical work requires a non-zero displacement in the direction of the force (W = F * s). Since the box remains stationary (displacement s = 0), the mechanical work done is zero. The energy expended by the pusher is dissipated internally as physiological heat.` }
    ],
    worksheet: [
      `Define work and state the conditions for work to be positive, negative, or zero.`,
      `State the Work-Energy Theorem.`,
      `Prove that the potential energy of a body at a height h is mgh.`,
      `A body of mass 10 kg is dropped from a height of 20 m. Calculate its KE and PE at: (i) start, (ii) 10 m height, (iii) just before hitting the ground.`,
      `Differentiate between commercial unit of energy (kWh) and Joules.`
    ],
    applications: [
      [`Hydroelectric Power Plants`, `Water stored in dams (Potential Energy) flows down (Kinetic Energy) to rotate turbines and generate electricity.`],
      [`Automobile Engines`, `Engine performance is rated in Horsepower (HP) to specify maximum torque and load capabilities.`],
    ],
  },
  6: {
    title: `Sound`,
    definitions: [
      [`Sound Wave`, `A longitudinal mechanical wave that propagates through a elastic medium via compression (high pressure) and rarefaction (low pressure) regions.`],
      [`Frequency`, `The number of compressions or rarefactions that cross a point per unit time, measured in Hertz (Hz).`],
      [`Wavelength`, `The distance between two consecutive compressions or two consecutive rarefactions, denoted by \u03BB (lambda).`],
      [`Echo`, `The reflection of sound that reaches the listener's ear at least 0.1 seconds after the direct sound, creating a distinct repetition.`],
      [`Ultrasonic Waves`, `Sound waves with frequencies greater than 20 kHz, which cannot be heard by human ears but are used in scanning.`],
    ],
    formulas: [
      `Wave Velocity: v = frequency (f) * wavelength (\u03BB)`,
      `Time Period (T) = 1 / frequency (f)`,
      `Minimum distance for Echo: d = v * t / 2 = 344 * 0.1 / 2 = 17.2 meters (at 22 \u00B0C)`,
      `Sonar distance calculation: 2 * d = v * t`,
    ],
    examples: [
      { q: `A sound wave has a frequency of 2 kHz and a wavelength of 35 cm. How long will it take to travel 1.5 km?`, ans: `Given: f = 2000 Hz, \u03BB = 0.35 m.\nVelocity v = f * \u03BB = 2000 * 0.35 = 700 m/s.\nTime to travel distance (1500 m): t = distance / velocity = 1500 / 700 = 2.14 seconds.` },
      { q: `A ship sends out ultrasound that returns from the seabed after 4 seconds. If the speed of sound in seawater is 1500 m/s, calculate the depth.`, ans: `Given: t = 4 s, v = 1500 m/s.\n2 * d = v * t => 2 * d = 1500 * 4 => 2d = 6000 => d = 3000 meters (3 km).` }
    ],
    hots: [
      { q: `Why is sound heard more clearly and over longer distances during a humid night than on a dry hot day?`, ans: `Humid air contains water vapor, which reduces the density of air compared to dry air. Since the velocity of sound is inversely proportional to the square root of the density of the medium (Laplace correction), sound travels faster in humid air, scattering less and traveling further.` }
    ],
    worksheet: [
      `Explain the propagation of sound waves as compressions and rarefactions.`,
      `Explain the three characteristics of sound: pitch, loudness, and quality/timbre.`,
      `What is reverberation? How can it be reduced in auditoriums?`,
      `Explain the working of SONAR with a neat diagram.`,
      `Write a brief note on the audible range of human hearing, infrasound, and ultrasound.`
    ],
    applications: [
      [`Ultrasonography`, `Medical scanners use high-frequency ultrasound pulses to create images of internal organs, checking fetal growth or tumor positions.`],
      [`Seabed Mapping`, `Submarines and research vessels use SONAR to map depth contours and locate shipwrecks.`],
    ],
  },
};

export const science9ChemistryTopics: Record<number, ChapterContent> = {
  1: {
    title: `Matter and Its Properties`,
    definitions: [
      [`Matter`, `Anything that has mass and occupies space, existing in three physical states: solid, liquid, and gas.`],
      [`Sublimation`, `The transition of a substance directly from the solid to the gas state without passing through the liquid state.`],
      [`Centrifugation`, `A separation technique that rotates mixtures at high speed to separate suspended solids of varying density from liquids.`],
      [`Chromatography`, `A laboratory technique for separating mixture components based on differences in adsorption and solubility in a mobile phase.`],
      [`Homogeneous Mixture`, `A mixture that has a uniform composition throughout its mass, displaying single-phase boundaries (e.g. air, alloy).`],
    ],
    formulas: [
      `Chromatography Retention Factor (Rf) = Distance traveled by component / Distance traveled by solvent front`,
      `Mass Percentage of solution = (Mass of solute / Mass of solution) * 100`,
      `Mass-Volume Percentage = (Mass of solute / Volume of solution) * 100`,
    ],
    examples: [
      { q: `A solution contains 40 g of common salt in 320 g of water. Calculate the concentration in terms of mass percentage.`, ans: `Mass of solute = 40 g, Mass of solvent = 320 g.\nMass of solution = Mass of solute + Mass of solvent = 40 + 320 = 360 g.\nMass % = (40 / 360) * 100 = 11.11%.` },
      { q: `In a paper chromatography test, a blue dye traveled 4 cm while the solvent front traveled 10 cm. Find the Rf value.`, ans: `Rf = Distance by dye / Distance by solvent = 4 cm / 10 cm = 0.4.` }
    ],
    hots: [
      { q: `Why is water considered a compound while air is classified as a mixture? Explain.`, ans: `Water is composed of hydrogen and oxygen chemically combined in a fixed ratio (1:8 by mass), and its properties are entirely different from hydrogen and oxygen. Air consists of nitrogen, oxygen, and other gases physically mixed in variable ratios, and each gas retains its individual physical properties.` }
    ],
    worksheet: [
      `Compare the properties of solids, liquids, and gases in terms of shape, volume, and compressibility.`,
      `Explain the separation of ammonium chloride and sand by sublimation.`,
      `Detail the principle of fractional distillation and name one industrial application.`,
      `Classify these as homogeneous or heterogeneous mixtures: milk, salt solution, brass, mud water.`,
      `How can we separate a mixture of oil and water? Describe the apparatus.`
    ],
    applications: [
      [`Petroleum Refineries`, `Fractional distillation columns separate crude oil into gasoline, kerosene, diesel, and asphalt.`],
      [`Forensic Laboratories`, `Paper and thin-layer chromatography are used to separate ink pigments or analyze blood toxins.`],
    ],
  },
  2: {
    title: `Atoms and Molecules`,
    definitions: [
      [`Law of Conservation of Mass`, `In any chemical reaction, mass is neither created nor destroyed; total mass of reactants equals total mass of products.`],
      [`Law of Definite Proportions`, `A chemical compound always contains its component elements in a fixed ratio by mass, regardless of source.`],
      [`Mole`, `The SI unit of amount of substance, representing exactly 6.022 x 10^23 elementary entities (atoms, molecules, or ions).`],
      [`Relative Molecular Mass`, `The sum of the atomic masses of all atoms present in a molecule, relative to 1/12th the mass of a carbon-12 atom.`],
      [`Avogadro's Number`, `The constant 6.022 x 10^23, representing the number of atoms in exactly 12 grams of carbon-12.`],
    ],
    formulas: [
      `Number of Moles (n) = Given Mass (m) / Molar Mass (M)`,
      `Number of Moles (n) = Number of Particles (N) / Avogadro's Number (Na)`,
      `Molar Mass (g/mol) = Mass of 1 mole of particles`,
    ],
    examples: [
      { q: `Calculate the number of moles in 52 g of Helium (He). (Atomic mass of He = 4).`, ans: `Given: Mass m = 52 g, Molar mass M = 4 g/mol.\nn = m / M = 52 / 4 = 13 moles.` },
      { q: `Calculate the molecular mass of nitric acid (HNO3). (H=1, N=14, O=16).`, ans: `Mass of HNO3 = 1(H) + 14(N) + 3 * 16(O) = 1 + 14 + 48 = 63 amu (g/mol).` }
    ],
    hots: [
      { q: `Which contains more atoms: 100 grams of Sodium (Na = 23) or 100 grams of Iron (Fe = 56)? Prove.`, ans: `For Sodium: n_Na = 100 / 23 = 4.35 moles. Number of atoms = 4.35 * Na.\nFor Iron: n_Fe = 100 / 56 = 1.78 moles. Number of atoms = 1.78 * Na.\nSince Sodium has a greater number of moles, 100 grams of Sodium contains significantly more atoms than 100 grams of Iron.` }
    ],
    worksheet: [
      `State Dalton's Atomic Theory postulates.`,
      `Explain the Law of Reciprocal Proportions with a suitable example.`,
      `Find the mass of 0.2 moles of water molecules.`,
      `Calculate the number of molecules present in 34 g of Ammonia (NH3) [N=14, H=1].`,
      `Define atomicity and give examples of monoatomic, diatomic, and polyatomic molecules.`
    ],
    applications: [
      [`Chemical Industry`, `Molar calculations are essential to mix precise stoichiometric amounts of reactants to yield maximum chemical products.`],
      [`Pharmaceutical Dosing`, `Mole conversions ensure drug tablets contain exact microgram measurements of active compounds.`],
    ],
  },
  3: {
    title: `Structure of Atom`,
    definitions: [
      [`Cathode Rays`, `Streams of fast-moving electrons emitted from the negative electrode (cathode) in a vacuum discharge tube.`],
      [`Valency`, `The combining capacity of an element, determined by the number of electrons lost, gained, or shared to achieve a stable octet.`],
      [`Isotopes`, `Atoms of the same element having the same atomic number (protons) but different mass numbers (neutrons).`],
      [`Isobars`, `Atoms of different elements having different atomic numbers but the same mass number.`],
      [`Isotones`, `Atoms of different chemical elements having different atomic numbers but sharing the same number of neutrons.`],
    ],
    formulas: [
      `Bohr Orbit Electron Capacity = 2 * n^2 where n is the orbit shell number (K=1, L=2, M=3, N=4)`,
      `Mass Number (A) = Number of Protons (Z) + Number of Neutrons (N)`,
      `Number of Neutrons (N) = Mass Number (A) - Atomic Number (Z)`,
    ],
    examples: [
      { q: `An element has atomic number Z = 11 and mass number A = 23. Find the number of protons, electrons, and neutrons.`, ans: `Atomic number Z = 11, so Protons = 11 and Electrons = 11.\nNeutrons = A - Z = 23 - 11 = 12.` },
      { q: `Write the electronic configuration of Calcium (Z = 20) using the Bohr-Bury rules.`, ans: `Z = 20. Shell capacities: K=2, L=8, M=8, N=2. Note that the outermost shell cannot have more than 8 electrons, so the 9th and 10th electrons go to N instead of completing M first. Configuration: 2, 8, 8, 2.` }
    ],
    hots: [
      { q: `An ion X^2- has 10 electrons and 8 neutrons. Identify the element and calculate the mass number of its neutral atom.`, ans: `The ion X^2- has 10 electrons, which means the neutral atom has 10 - 2 = 8 electrons. Therefore, its atomic number Z = 8 (Oxygen).\nMass number A = Z + Neutrons = 8 + 8 = 16.` }
    ],
    worksheet: [
      `Explain Rutherford's Alpha Particle Scattering Experiment and its key atomic model postulates.`,
      `State the main drawbacks of Rutherford's nuclear model and how Bohr's model resolved them.`,
      `Draw the electronic Bohr shell diagrams for: Carbon, Sodium, and Chlorine.`,
      `Compare isotopes, isobars, and isotones with two examples of each.`,
      `Explain the applications of isotopes in medicine (cancer treatment, thyroid scanning).`
    ],
    applications: [
      [`Cancer Therapy`, `Cobalt-60 isotope radiation is targeted at cancer cells to destroy malignant tissue without major surgical operations.`],
      [`Archaeological Dating`, `Carbon-14 isotope half-life measurements are used to determine the age of ancient fossils and wooden carvings.`],
    ],
  },
  4: {
    title: `Periodic Classification`,
    definitions: [
      [`Modern Periodic Law`, `The physical and chemical properties of elements are periodic functions of their atomic numbers.`],
      [`Groups`, `The 18 vertical columns in the periodic table, where elements share the same number of valence electrons and chemical behaviors.`],
      [`Periods`, `The 7 horizontal rows in the periodic table, representing the number of electron shells in the atom.`],
      [`Atomic Radius`, `The distance from the center of the nucleus to the outermost valence shell of the electron cloud in an atom.`],
      [`Electronegativity`, `The tendency of an atom in a molecule to attract the shared pair of electrons towards itself.`],
    ],
    formulas: [
      `Atomic size trend: Decreases across a period (increasing nuclear charge), increases down a group (new shells added).`,
      `Ionization Energy trend: Increases across a period, decreases down a group.`,
      `Metallic character trend: Decreases across a period, increases down a group.`,
    ],
    examples: [
      { q: `Explain why Sodium (Z=11) is more reactive than Lithium (Z=3) although they belong to the same alkali metals group.`, ans: `Sodium is lower in Group 1 than Lithium. It has more electron shells, making its valence electron further from the nucleus. Thus, less energy is required to lose this electron, making Sodium more reactive.` },
      { q: `Arrange the following in increasing order of atomic radius: F, N, O, B.`, ans: `These belong to the same Period 2. Atomic size decreases from left to right as nuclear charge increases. Order: B, C, N, O, F. So increasing order: F < O < N < B.` }
    ],
    hots: [
      { q: `Why are noble gases placed in a separate group (Group 18) at the far right of the periodic table?`, ans: `Noble gases have a completely filled outer valence shell (helium has 2, others have stable octet 8). This configuration makes them chemically inert and highly stable. Placing them in Group 18 reflects their shared zero valency and isolates them from highly reactive elements.` }
    ],
    worksheet: [
      `State Dobereiner's Law of Triads and Newlands' Law of Octaves.`,
      `State the differences between Mendeleev's periodic table and the Modern periodic table.`,
      `Define ionization energy and explain its trend across a period.`,
      `Why does electronegativity decrease down a group?`,
      `Name the first element of: (i) Alkali metals, (ii) Halogens, (iii) Noble gases.`
    ],
    applications: [
      [`Chemical Material Synthesis`, `Engineers refer to group trends to predict material properties, designing alloys and semiconductors by matching elements.`],
      [`Alloy Manufacturing`, `Understanding atomic radii and periods allows metallurgists to replace iron atoms with chromium to form stainless steel.`],
    ],
  },
  5: {
    title: `Chemical Bonding`,
    definitions: [
      [`Octet Rule`, `The tendency of atoms to prefer to have eight electrons in their valence shell by losing, gaining, or sharing electrons to achieve stability.`],
      [`Ionic Bond`, `A chemical bond formed by the electrostatic attraction between oppositely charged ions, involving electron transfer (metals to non-metals).`],
      [`Covalent Bond`, `A chemical bond formed by the sharing of one or more electron pairs between two non-metal atoms.`],
      [`Coordinate Covalent Bond`, `A covalent bond where the shared electron pair is contributed by only one of the bonding atoms (donor-acceptor bond).`],
      [`Lewis Dot Structure`, `A visual representation showing the valence shell electrons of an atom and how they are distributed in bonds.`],
    ],
    formulas: [
      `Ionic bonding capacity = Number of electrons transferred to form stable ions.`,
      `Covalent bonding capacity = Number of electron pairs shared between atoms.`,
    ],
    examples: [
      { q: `Describe the formation of Magnesium Chloride (MgCl2) using ionic bonding.`, ans: `Magnesium (2,8,2) loses 2 valence electrons to become Mg^2+.\nTwo Chlorine atoms (2,8,7) each gain 1 electron to become Cl^-.\nElectrostatic force binds them: Mg^2+ + 2Cl^- -> MgCl2.` },
      { q: `Draw the covalent bonding sharing in a Methane (CH4) molecule.`, ans: `Carbon (2,4) has 4 valence electrons and needs 4. Four Hydrogen atoms (1) each share 1 electron with Carbon, forming 4 single covalent C-H bonds.` }
    ],
    hots: [
      { q: `Why do ionic compounds (like NaCl) have high melting points and conduct electricity in molten state, whereas covalent compounds (like glucose) do not?`, ans: `Ionic compounds form strong crystal lattices held by strong electrostatic forces, requiring high thermal energy to melt. In molten or aqueous states, these ions dissociate and are free to migrate, conducting current. Covalent molecules are bound by weak intermolecular forces, melting easily and containing no free ions or electrons to conduct electricity.` }
    ],
    worksheet: [
      `Explain the conditions required for the formation of an ionic bond.`,
      `Draw the Lewis dot structures of: H2O, NH3, and CO2.`,
      `What is a coordinate bond? Explain its formation in ammonium ion (NH4+).`,
      `List four differences between ionic and covalent compounds.`,
      `State the octet rule and discuss its limitations (e.g. SF6, PCl5).`
    ],
    applications: [
      [`Industrial Electrolyte Production`, `Ionic compounds are manufactured for batteries and physiological saline drinks to permit electrical conduction.`],
      [`Polymer Synthesis`, `Covalent materials (plastics, silicones) are synthesized to produce structural insulators and heat-resistant wraps.`],
    ],
  },
};

export const science9BiologyTopics: Record<number, ChapterContent> = {
  1: {
    title: `The Cell`,
    definitions: [
      [`Cell`, `The basic structural, functional, and biological unit of all known living organisms, discovered by Robert Hooke in 1665.`],
      [`Prokaryote`, `A unicellular organism that lacks a distinct nuclear membrane and membrane-bound organelles, like bacteria.`],
      [`Eukaryote`, `An organism whose cells contain a well-defined nucleus enclosed in a nuclear membrane and membrane-bound organelles.`],
      [`Mitochondria`, `The double-membraned organelle responsible for aerobic respiration and ATP energy generation, called the power house of the cell.`],
      [`Chloroplast`, `A chlorophyll-containing plastid found in plant cells that performs photosynthesis, transforming light into chemical energy.`],
    ],
    formulas: [
      `Cell Theory Postulates: (1) All living things are composed of cells, (2) The cell is the fundamental unit of structure and function, (3) New cells arise from pre-existing cells (Virchow).`,
      `Cell Wall: Present in plants (cellulose), absent in animals.`,
    ],
    examples: [
      { q: `Compare the vacuoles in plant cells and animal cells.`, ans: `Plant cells have a single, massive, permanent central vacuole that maintains turgidity and stores cell sap. Animal cells have multiple, very small, temporary vacuoles used for waste or food ingestion.` },
      { q: `Identify the main function of ribosomes and lysosome organelles.`, ans: `Ribosomes are the sites of protein synthesis. Lysosomes contain digestive enzymes to break down waste or foreign pathogens, often called 'suicide bags' if they rupture and digest their own cell.` }
    ],
    hots: [
      { q: `Why are mitochondria and chloroplasts called semi-autonomous organelles?`, ans: `Both mitochondria and chloroplasts contain their own circular DNA and ribosomes. This allows them to replicate independently inside the cell and synthesize some of their own proteins, resembling ancestral symbiotic prokaryotes.` }
    ],
    worksheet: [
      `Draw a neat, labeled diagram of a plant cell and an animal cell.`,
      `State five differences between prokaryotic and eukaryotic cells.`,
      `Describe the structure and functions of: (i) Golgi apparatus, (ii) Endoplasmic Reticulum.`,
      `What is the function of the cell membrane? Explain the fluid mosaic model.`,
      `Why is nucleus called the control center of the cell? Describe its parts.`
    ],
    applications: [
      [`Bio-Medicine Research`, `Stem cell isolation and cellular line studies rely on manipulating eukaryotic organelles to target hereditary diseases.`],
      [`Agricultural Crop Breeding`, `Chloroplast genetics allow researchers to engineer hybrid crops with higher photosynthetic rates under low light.`],
    ],
  },
  2: {
    title: `Tissues`,
    definitions: [
      [`Tissue`, `A group of cells similar in structure and origin that work together to perform a specific physiological function.`],
      [`Meristematic Tissue`, `Plant tissue consisting of actively dividing cells, responsible for primary and secondary growth, located at growing tips.`],
      [`Parenchyma`, `A simple permanent plant tissue consisting of thin-walled living cells, serving functions of storage and photosynthesis.`],
      [`Sclerenchyma`, `A simple permanent plant tissue consisting of dead cells with highly thickened lignified walls, providing rigidity and strength.`],
      [`Xylem`, `A complex permanent vascular tissue that conducts water and minerals upward from roots to leaves.`],
    ],
    formulas: [
      `Complex tissues: Xylem (tracheids, vessels, xylem parenchyma, xylem fibers) and Phloem (sieve tubes, companion cells, phloem parenchyma, phloem fibers).`,
      `Animal tissue classification: Epithelial, Connective, Muscular, Nervous.`,
    ],
    examples: [
      { q: `What is the function of meristematic tissues and where are they located?`, ans: `Meristems undergo continuous cell division to grow the plant. They are located at the root and shoot tips (apical meristems), leaf bases (intercalary meristems), and stems girth (lateral meristems).` },
      { q: `Explain the function of nervous tissue and its cellular unit.`, ans: `Nervous tissue conducts electrochemical nerve impulses to coordinate body responses. Its unit cell is the Neuron, consisting of a cyton, dendrites, and an axon.` }
    ],
    hots: [
      { q: `How does the structure of Sclerenchyma cells relate to their function in plants?`, ans: `Sclerenchyma cells have thick cell walls reinforced with lignin, which makes them impermeable to water and extremely stiff. They lose their cytoplasm at maturity (dead cells) to form hollow, rigid fibers. This provides optimal mechanical support to hulls, seed coats, and leaves.` }
    ],
    worksheet: [
      `Classify plant tissues in a detailed flowchart.`,
      `Differentiate between Xylem and Phloem in tabular form.`,
      `Describe the structure and location of three types of muscle fibers: striated, smooth, and cardiac.`,
      `Explain the components and functions of connective tissue (blood, bone, cartilage).`,
      `Explain the difference between simple permanent and complex permanent plant tissues.`
    ],
    applications: [
      [`Horticulture and Forestry`, `Propagating lateral meristems (grafting cambium) is crucial to cultivate commercial timber and orchards.`],
      [`Medical Skin Grafting`, `Epithelial tissue culture allows clinics to grow skin sheets from donor cells to treat burn victims.`],
    ],
  },
  3: {
    title: `Diversity of Life`,
    definitions: [
      [`Taxonomy`, `The branch of biology concerned with identifying, classifying, and naming living organisms.`],
      [`Five Kingdom Classification`, `Whittaker's system classifying life into Monera, Protista, Fungi, Plantae, and Animalia based on cell complexity and nutrition.`],
      [`Binomial Nomenclature`, `Carl Linnaeus's system of naming organisms using two Latin words: Genus (capitalized) and species (lowercase), written in italics.`],
      [`Phylum`, `A taxonomic rank below Kingdom and above Class, separating animals based on major body plans (e.g. Arthropoda, Chordata).`],
      [`Hermaphrodite`, `An organism possessing both male and female reproductive organs, capable of producing both sperm and eggs.`],
    ],
    formulas: [
      `Taxonomic hierarchy: Kingdom -> Phylum -> Class -> Order -> Family -> Genus -> Species`,
      `Binomial notation rule: Genus (first letter capitalized) + Species (lowercase). Example: Homo sapiens.`,
    ],
    examples: [
      { q: `State two main characteristics of Phylum Arthropoda.`, ans: `Arthropods have: (1) jointed appendages/legs, (2) a chitinous exoskeleton, and (3) a segmented body. They represent the largest phylum in the animal kingdom.` },
      { q: `List the scientific names of: (i) Human, (ii) Frog, (iii) Neem tree.`, ans: `(i) Human: *Homo sapiens*\n(ii) Frog: *Rana hexadactyla*\n(iii) Neem: *Azadirachta indica*.` }
    ],
    hots: [
      { q: `Why are viruses excluded from Whittaker's Five Kingdom classification system?`, ans: `Viruses do not possess a cellular structure and are inert outside a host cell. They display living characteristics only when they enter a host and use its cellular machinery to replicate. Because they border the living and non-living, they do not fit into Whittaker's cell-based kingdoms.` }
    ],
    worksheet: [
      `Outline the characteristics of Whittaker's Five Kingdoms with examples.`,
      `Explain the rules to be followed while writing binomial scientific names.`,
      `Compare non-chordates and chordates, listing three differences.`,
      `Classify the following phyla based on body symmetry and coelom: Porifera, Annelida, Mollusca.`,
      `What are the unique adaptations of Phylum Aves (birds) for aerial flight?`
    ],
    applications: [
      [`Ecological Conservation`, `Species taxonomic indexing allows ecologists to track endangered classifications and protect biodiversity zones.`],
      [`Agricultural Pest Control`, `Identifying specific insect phyla and families allows farms to formulate target-specific bio-pesticides.`],
    ],
  },
  4: {
    title: `Why Do We Fall Ill?`,
    definitions: [
      [`Health`, `A state of complete physical, mental, and social well-being, and not merely the absence of disease or infirmity.`],
      [`Infectious Diseases`, `Diseases caused by pathogens (microbes) that can spread from an infected person to a healthy individual.`],
      [`Pathogens`, `Microscopic disease-causing agents, including bacteria, viruses, protozoa, fungi, and worms.`],
      [`Immunity`, `The body's capability to resist and neutralize infections, which can be natural (innate) or acquired.`],
      [`Vaccination`, `The administration of weakened or dead pathogens (vaccines) to stimulate the immune system to build antibodies.`],
    ],
    formulas: [
      `Disease transmission methods: Air-borne (Tuberculosis), Water-borne (Cholera), Vector-borne (Malaria), Sexual contact (AIDS).`,
      `Antibiotics: Drugs that block metabolic pathways of bacteria (ineffective against viruses).`,
    ],
    examples: [
      { q: `What is the vector for Malaria and Dengue?`, ans: `Malaria is transmitted by the female *Anopheles* mosquito. Dengue is transmitted by the female *Aedes* mosquito. The mosquitoes carry the pathogen but do not suffer from the disease.` },
      { q: `Explain why we cannot cure a common cold with standard antibiotics.`, ans: `Common cold is a viral infection. Antibiotics function by disrupting the biochemical cell wall pathways of bacteria. Since viruses lack cell walls and utilize the host's pathways, antibiotics have no effect on them.` }
    ],
    hots: [
      { q: `How does immunization create long-term protection against severe infections?`, ans: `When a vaccine is administered, the immune system produces antibodies and creates 'memory cells'. If the active pathogen attacks in the future, these memory cells immediately recognize it, producing a massive surge of targeted antibodies to destroy the infection before it causes illness.` }
    ],
    worksheet: [
      `Explain the difference between acute and chronic diseases with examples.`,
      `State the common symptoms and prevention methods of: (i) Tuberculosis, (ii) Typhoid.`,
      `How does pulse polio immunization work?`,
      `Explain the principles of treatment and prevention of infectious diseases.`,
      `What are vector-borne diseases? How can we control mosquito breeding?`
    ],
    applications: [
      [`Public Health Administration`, `WHO and local health departments design vaccination campaigns (e.g. COVID-19, BCG) to achieve herd immunity.`],
      [`Water Sanitation`, `Chlorinating public water supplies kills bacterial pathogens, preventing cholera epidemics.`],
    ],
  },
  5: {
    title: `Natural Resources`,
    definitions: [
      [`Biosphere`, `The global ecological system integrating all living beings and their relationships, encompassing land, water, and air.`],
      [`Biogeochemical Cycle`, `The cyclic pathway by which chemical substances move through the biotic (living) and abiotic (non-living) compartments of Earth.`],
      [`Nitrogen Fixation`, `The chemical process of converting atmospheric nitrogen gas into nitrogenous compounds (like nitrates) that plants can absorb.`],
      [`Eutrophication`, `The enrichment of water bodies with nutrients (fertilizers/sewage), causing excessive algae growth and oxygen depletion.`],
      [`Greenhouse Effect`, `The trapping of solar radiation heat by gases (carbon dioxide, methane) in the atmosphere, warming the planet.`],
    ],
    formulas: [
      `Nitrogen cycle steps: Nitrogen Fixation -> Nitrification -> Assimilation -> Ammonification -> Denitrification.`,
      `Oxygen levels: Atmosphere is 21% oxygen. It is cycled via respiration and photosynthesis.`,
    ],
    examples: [
      { q: `Explain the role of Rhizobium bacteria in the soil.`, ans: `Rhizobium resides in the root nodules of leguminous plants (e.g., peas). It performs nitrogen fixation, converting atmospheric nitrogen into nitrates, which enriches the soil and acts as natural fertilizer.` },
      { q: `What are the primary gases responsible for the greenhouse effect and global warming?`, ans: `Carbon Dioxide (CO2), Methane (CH4), Nitrous Oxide (N2O), and Water Vapor. Deforestation and burning fossil fuels increase their concentration, raising global temperatures.` }
    ],
    hots: [
      { q: `How does deforestation disturb both the Carbon cycle and the Oxygen cycle simultaneously?`, ans: `Trees perform photosynthesis, absorbing CO2 and releasing O2. Cutting down forests reduces the absorption rate of CO2, leading to global warming, and decreases the replenishment of atmospheric O2. If the trees are burned, it also consumes massive O2 and releases even more CO2, compounding the imbalance.` }
    ],
    worksheet: [
      `Describe the Nitrogen Cycle with a neat flowchart.`,
      `Explain the steps of the Carbon Cycle.`,
      `What is acid rain? State its causes and harmful effects on monuments and crops.`,
      `Discuss the causes of soil erosion and how afforestation prevents it.`,
      `Write a short note on rainwater harvesting and its ecological advantages.`
    ],
    applications: [
      [`Sustainable Agriculture`, `Crop rotation with leguminous crops utilizes biological nitrogen fixation to maintain soil fertility without chemical fertilizers.`],
      [`Climatic Research`, `Environmental agencies monitor carbon cycle indicators to model global emissions limits and treaty thresholds.`],
    ],
  },
};

export function getChapterContent(
  classId: string,
  classTitle: string,
  subjectId: string,
  subjectTitle: string,
  chapterId: string,
  chapterTitle: string,
  topicId?: string,
  topicTitle?: string,
): ChapterContent | null {
  // Extract chapter number from chapterId or chapterTitle
  let chNum = 0;
  const idMatch = chapterId.match(/ch(\d+)/i);
  const titleMatch = chapterTitle.match(/(?:Chapter|Unit)\s+(\d+)/i);
  if (idMatch) chNum = parseInt(idMatch[1], 10);
  else if (titleMatch) chNum = parseInt(titleMatch[1], 10);
  if (chNum === 0) return null;

  const isCl9 = classId === "class-9" || classTitle === "Class 9";
  const isCl10 = classId === "class-10" || classTitle === "Class 10";
  const isCl11 = classId === "class-11" || classTitle === "Class 11";
  const isCl12 = classId === "class-12" || classTitle === "Class 12";

  const sId = subjectId.toLowerCase();
  const sTitle = subjectTitle.toLowerCase();

  // Class 9
  if (isCl9) {
    if (sId.startsWith("maths") || sTitle.includes("math")) {
      return maths9Data[chNum] || null;
    }
    if (sId.startsWith("science") || sTitle === "science") {
      const tId = topicId?.toLowerCase() || "";
      const tTitle = topicTitle?.toLowerCase() || "";
      
      // Dispatch by topicId prefix/content or topicTitle keyword
      if (tId.includes("sci-ph-t1") || tTitle.includes("measurement")) return science9PhysicsTopics[1];
      if (tId.includes("sci-ph-t2") || tTitle.includes("motion")) return science9PhysicsTopics[2];
      if (tId.includes("sci-ph-t3") || tTitle.includes("force")) return science9PhysicsTopics[3];
      if (tId.includes("sci-ph-t4") || tTitle.includes("gravitation")) return science9PhysicsTopics[4];
      if (tId.includes("sci-ph-t5") || tTitle.includes("work")) return science9PhysicsTopics[5];
      if (tId.includes("sci-ph-t6") || tTitle.includes("sound")) return science9PhysicsTopics[6];

      if (tId.includes("sci-ch-t1") || tTitle.includes("matter")) return science9ChemistryTopics[1];
      if (tId.includes("sci-ch-t2") || tTitle.includes("atoms")) return science9ChemistryTopics[2];
      if (tId.includes("sci-ch-t3") || tTitle.includes("structure")) return science9ChemistryTopics[3];
      if (tId.includes("sci-ch-t4") || tTitle.includes("periodic")) return science9ChemistryTopics[4];
      if (tId.includes("sci-ch-t5") || tTitle.includes("bonding")) return science9ChemistryTopics[5];

      if (tId.includes("sci-bi-t1") || tTitle.includes("cell")) return science9BiologyTopics[1];
      if (tId.includes("sci-bi-t2") || tTitle.includes("tissues")) return science9BiologyTopics[2];
      if (tId.includes("sci-bi-t3") || tTitle.includes("diversity")) return science9BiologyTopics[3];
      if (tId.includes("sci-bi-t4") || tTitle.includes("ill") || tTitle.includes("health")) return science9BiologyTopics[4];
      if (tId.includes("sci-bi-t5") || tTitle.includes("natural")) return science9BiologyTopics[5];

      // Fallback to old chNum if topic fails
      return science9Data[chNum] || null;
    }
  }

  // Class 10
  if (isCl10) {
    if (sId.startsWith("maths") || sTitle.includes("math")) {
      return maths10Data[chNum] || null;
    }
    if (sId.startsWith("science") || sTitle === "science") {
      return science10Data[chNum] || null;
    }
  }

  // Class 11
  if (isCl11) {
    if (sId.startsWith("maths") || sTitle.includes("math")) {
      return maths11Data[chNum] || null;
    }
    if (sId.startsWith("physics") || sTitle.includes("physics")) {
      return physics11Data[chNum] || null;
    }
    if (sId.startsWith("chemistry") || sTitle.includes("chemistry")) {
      return chemistry11Data[chNum] || null;
    }
  }

  // Class 12
  if (isCl12) {
    if (sId.startsWith("maths") || sTitle.includes("math")) {
      return maths12Data[chNum] || null;
    }
    if (sId.startsWith("physics") || sTitle.includes("physics")) {
      return physics12Data[chNum] || null;
    }
    if (sId.startsWith("chemistry") || sTitle.includes("chemistry")) {
      return chemistry12Data[chNum] || null;
    }
  }

  return null;
}

/**
 * Determine the subject type for diagram selection.
 * Returns: 'maths' | 'physics' | 'chemistry' | 'biology' | 'compsci' | 'generic'
 */
export function getSubjectType(
  subjectId: string,
  subjectTitle: string,
  chapterId: string,
  chapterTitle: string,
): string {
  const sId = subjectId.toLowerCase();
  const sTitle = subjectTitle.toLowerCase();
  const cTitle = chapterTitle.toLowerCase();

  // For Science subjects, dispatch by chapter
  if (sId.startsWith("science") || sTitle === "science") {
    if (cTitle.includes("physics") || chapterId.includes("-ph-")) return "physics";
    if (cTitle.includes("chemistry") || chapterId.includes("-ch-") || chapterId === "sci10-ch2") return "chemistry";
    if (cTitle.includes("biology") || chapterId.includes("-bi-") || chapterId === "sci10-ch3") return "biology";
    if (cTitle.includes("computer") || chapterId.includes("-cs-") || chapterId === "sci10-ch4") return "compsci";
    return "physics"; // default science fallback
  }

  if (sId.startsWith("maths") || sTitle.includes("math")) return "maths";
  if (sId.startsWith("physics") || sTitle.includes("physics")) return "physics";
  if (sId.startsWith("chemistry") || sTitle.includes("chemistry")) return "chemistry";

  return "generic";
}
