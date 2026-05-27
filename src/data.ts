/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, LectureNote, VideoLecture, PYQ, SyllabusItem, Quiz } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced Calculus & Real Analysis for JEE',
    description: 'Master limits, continuity, differentiability, integration techniques, and differential equations. Designed specifically for JEE Advanced top-100 rank aspirants.',
    fee: 4999,
    rating: 4.9,
    durationMonths: 4,
    lecturesCount: 48,
    syllabus: [
      'Functions, Domain, and Range',
      'Limits, Continuity & Differentiability (LCD)',
      'Application of Derivatives (Tangents, Monotonicity, Maxima-Minima)',
      'Indefinite & Definite Integrals with Properties',
      'Area Under Curves & Differential Equations'
    ],
    tag: 'Advanced Intensive',
    bannerUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'c2',
    title: 'Comprehensive Algebra & Combinatorics Specbook',
    description: 'Unravel Complex Numbers, Quadratic Equations, Binomial Theorem, Permutations & Combinations (P&C), and Probability with logical rigor.',
    fee: 3999,
    rating: 4.8,
    durationMonths: 3,
    lecturesCount: 36,
    syllabus: [
      'Quadratic Equations & Complex Number Geometry',
      'Arithmetic, Geometric, and Harmonic Progressions (AP/GP/HP)',
      'Permutations & Combinations (P&C) - Grid, Partition methods',
      'Binomial Theorem & Infinite Series Convergence',
      'Probability Distributions, Baye\'s Theorem and Expectations'
    ],
    tag: 'Foundation',
    bannerUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'c3',
    title: 'Coordinate Geometry, Vectors & 3D Space Masterclass',
    description: 'Visualizing maths in 2D and 3D. Master Straight Lines, Circles, Conic Sections (Parabola, Ellipse, Hyperbola), Vector Algebra, and 3D Lines/Planes.',
    fee: 3499,
    rating: 4.7,
    durationMonths: 3,
    lecturesCount: 30,
    syllabus: [
      'Straight Lines & Pairs of Straight Lines',
      'Circles, Orthogonality & Radical Axis',
      'Conics: Unified focus-directrix approach',
      'Vector Triple Products & Geometrical Proofs',
      '3D Planes, Shortest Distances, and Sphere intersections'
    ],
    tag: 'Rank Booster',
    bannerUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_SYLLABUS: SyllabusItem[] = [
  {
    id: 's1',
    category: 'Algebra',
    topic: 'Complex Numbers & Quadratic Equations',
    weightage: '8% - 10%',
    status: 'Completed',
    keyConcepts: [
      'De Moivre\'s Theorem and Roots of Unity',
      'Geometric representation of complex solutions (Circles, Ellipses)',
      'Location of roots of quadratic equations with parameters',
      'Newton\'s sum formulas for symmetric roots'
    ],
    recommendedBooks: ['Cengage Mathematics for JEE Advanced - G. Tewani', 'Higher Algebra - Hall & Knight']
  },
  {
    id: 's2',
    category: 'Calculus',
    topic: 'Integral Calculus & Area Under Curve',
    weightage: '12% - 15%',
    status: 'In Progress',
    keyConcepts: [
      'Leibniz Rule for differentiating under integral sign',
      'Definite integration as limit of sum',
      'Standard reduction formulas',
      'Solving homogeneous and linear Differential Equations'
    ],
    recommendedBooks: ['Skills in Mathematics: Integral Calculus - Amit M. Agarwal', 'Problems in Calculus of One Variable - I.A. Maron']
  },
  {
    id: 's3',
    category: 'Vectors & 3D',
    topic: 'Vector Algebra and Three Dimensional Geometry',
    weightage: '10% - 12%',
    status: 'Upcoming',
    keyConcepts: [
      'Scalar and Vector Triple Products (STP, VTP)',
      'Coplanarity and Linear Dependence of vectors',
      'Symmetric form of 3D lines and projection of a point',
      'Equation of planes Bisecting the angle between other planes'
    ],
    recommendedBooks: ['Cengage Vectors and 3D Geometry', 'Co-ordinate Geometry - S.L. Loney']
  }
];

export const INITIAL_NOTES: LectureNote[] = [
  {
    id: 'n1',
    title: 'Unification of Limits at Infinity & Sandwich Theorem',
    description: 'Comprehensive analytic derivations of limits using squeeze techniques. Contains 15 solved transcendental limit proofs.',
    chapter: 'Limits & Continuity',
    category: 'Calculus',
    fileUrl: '/docs/limits_at_infinity_notes.pdf',
    pageCount: 12,
    isPremium: false,
    contentPreview: `
=========================================
QUANTREX ACADEMY: ADVANCED LECTURE SERIES
TOPIC: THE SANDWICH (SQUEEZE) THEOREM AND THE LIMIT OF sin(x)/x
=========================================

1. Introduction to the Squeeze Theorem:
Let I be an interval containing the point c. Let f, g, and h be functions defined on I, except possibly at c itself. Suppose that for every x in I not equal to c, we have:
  g(x) <= f(x) <= h(x)
And suppose that:
  lim (x -> c) g(x) = lim (x -> c) h(x) = L
Then it must be that:
  lim (x -> c) f(x) = L.

2. Geometrical Proof that lim (x -> 0) sin(x)/x = 1:
Consider a unit circle centered at O. Let theta be an angle in the first quadrant (0 < theta < pi/2).
- Let A be the point (1,0) on the circle.
- Let P be the point (cos theta, sin theta) on the circle.
- Draw a tangent to the circle at A, meeting the extended ray OP at point T(1, tan theta).
By comparing areas:
  Area of Triangle OPA < Area of Sector OPA < Area of Triangle OTA
Substituting the geometric calculations:
  1/2 * (1) * (sin theta) < 1/2 * (1)^2 * theta < 1/2 * (1) * (tan theta)
Multiplying by 2/sin theta (since sin theta > 0 for theta in (0, pi/2)):
  1 < theta / sin theta < 1 / cos theta.
Taking the reciprocal:
  cos theta < sin(theta) / theta < 1.
As theta -> 0, lim cos theta = 1 and lim 1 = 1.
By the Squeeze Theorem, we conclude:
  lim (theta -> 0) sin(theta) / theta = 1.

3. Advanced Application (JEE Advanced Exemplar):
Evaluate L = lim (n -> infinity) [ (1/(n^2 + 1)) + (2/(n^2 + 2)) + ... + (n/(n^2 + n)) ]
Let S_n = sum_{k=1}^n (k / (n^2 + k)).
Observe the lower and upper bounds:
Lower bound: Replace denominator k with n:
  S_n >= sum_{k=1}^n (k / (n^2 + n)) = (1 / (n^2 + n)) * sum_{k=1}^n k = [n(n+1)] / [2(n^2 + n)] = 1/2.
Upper bound: Replace denominator k with 1:
  S_n <= sum_{k=1}^n (k / (n^2 + 1)) = (1 / (n^2 + 1)) * [n(n+1)] / 2 = (n^2 + n) / (2n^2 + 2).
Now, take limits as n -> infinity:
  lim Lower bound = 1/2
  lim Upper bound = lim (1 + 1/n) / (2 + 2/n^2) = 1/2.
By Sandwich Theorem, L = 1/2.
=========================================
WARNING: THIS CONTENT IS COPYRIGHTED TO QUANTREX ACADEMY.
ILLEGAL REPRODUCTION OR EXPORT WILL FACE INTELLECTUAL PROPERTY PROSECUTION.
DOWNLOAD BLOCKED SECURE SYSTEM ENFORCED.
    `
  },
  {
    id: 'n2',
    title: 'Rotational Geometry of Complex Numbers under Euler Identity',
    description: 'A study on multiplication by complex exponents acting as operators of rotational transformations in the Argand plane.',
    chapter: 'Complex Numbers',
    category: 'Algebra',
    fileUrl: '/docs/complex_rotations_euler.pdf',
    pageCount: 16,
    isPremium: true,
    contentPreview: `
=========================================
QUANTREX ACADEMY: ADVANCED LECTURE SERIES
TOPIC: ROTATIONAL OPERATORS & COMPLEX AMPLITUDE GEOMETRY
=========================================

1. Euler's Formula as a Rotator:
Any complex number z = x + iy can be written in polar representation as z = r * (cos theta + i sin theta) = r * e^(i * theta).
When we multiply a complex number z_1 by some z_2 = e^(i * alpha), we get:
  z_new = z_1 * e^(i * alpha) = (r * e^(i * theta)) * e^(i * alpha)
        = r * e^(i * (theta + alpha)).
Notice that the magnitude r remains absolutely invariant, while the amplitude is incremented by alpha. Thus, multiplying by e^(i * alpha) is geometrically equivalent to rotating the vector representation counter-clockwise by angle alpha around the origin.

2. Rotation About an Arbitrary Center (z_0):
To rotate a point z_1 about point z_0 by an angle alpha:
1. Shift the origin to z_0: (z_1 - z_0)
2. Apply rotational multiplication: (z_1 - z_0) * e^(i * alpha)
3. Shift the origin back: (z_1 - z_0) * e^(i * alpha) + z_0.
Therefore, the coordinate of the rotated point is:
  z_rotated = z_0 + (z_1 - z_0) * e^(i * alpha).

3. Standard Problem: Equilateral Triangle in Argand Plane:
Let z_1, z_2, z_3 be the vertices of an equilateral triangle ordered counter-clockwise.
Since the interior angle is pi/3 (60 degrees) and we can rotate z_2 around z_1 to get z_3:
  (z_3 - z_1) = (z_2 - z_1) * e^(i * pi/3)
Similarly, (z_1 - z_2) = (z_3 - z_2) * e^(i * pi/3).
Eliminating e^(i * pi/3) yields the classic algebraic identity:
  z_1^2 + z_2^2 + z_3^2 = z_1*z_2 + z_2*z_3 + z_3*z_1.

=========================================
PROTECTED BY QUANTREX SECURE VIEWER V1.2
PRINTING AND DOCUMENT SAVING DISABLING HOOKS ACTIVE.
    `
  },
  {
    id: 'n3',
    title: 'Shortest Distance Between Skew Lines in 3D Space',
    description: 'Vector proofs and analytic equations for distance of lines that are neither parallel nor intersecting.',
    chapter: '3D Geometry',
    category: 'Vectors & 3D',
    fileUrl: '/docs/skew_lines_3d_geometry.pdf',
    pageCount: 8,
    isPremium: true,
    contentPreview: `
=========================================
QUANTREX ACADEMY: ADVANCED LECTURE SERIES
TOPIC: SKEW LINES AND THE SHORTEST DISTANCE VECTOR
=========================================

1. Definition of Skew Lines:
In 3D geometry, skew lines are two lines that do not intersect and are not parallel. They can only exist in three or more dimensions.

2. Vector Representation:
Let Line L_1 pass through point A with position vector a_1 and be parallel to vector b_1:
  r_1 = a_1 + lambda * b_1
Let Line L_2 pass through point B with position vector a_2 and be parallel to vector b_2:
  r_2 = a_2 + mu * b_2

3. Deriving the Shortest Distance (d):
The shortest distance vector between L_1 and L_2 is parallel to the common perpendicular vector.
A vector perpendicular to both lines is: n = b_1 x b_2.
The unit vector along the common perpendicular is:
  n_unit = (b_1 x b_2) / |b_1 x b_2|
The vector connecting the reference points on both lines is:
  v_connect = a_2 - a_1
The shorted distance d is the scalar projection of v_connect along n_unit:
  d = | (a_2 - a_1) . n_unit |
  d = | (a_2 - a_1) . (b_1 x b_2) | / |b_1 x b_2|

which is the absolute value of the scalar triple product [a_2 - a_1, b_1, b_2] divided by |b_1 x b_2|.

4. Condition for Intersection:
If L_1 and L_2 intersect, the shortest distance d is zero. Hence:
  [a_2 - a_1, b_1, b_2] = 0.
This means the points A, B and vectors b_1, b_2 are coplanary.

=========================================
PROTECTED PREVIEW - DOWNLOADING STRIPPED - ENCRYPTED CANVAS RENDER ONLY.
`
  }
];

export const INITIAL_VIDEOS: VideoLecture[] = [
  {
    id: 'v1',
    title: 'Mastering Leibniz Rule for Integral Differentiation',
    description: 'Learn how to differentiate integrals with variable limits. Highly repetitive JEE Advanced questions decoded.',
    chapter: 'Integral Calculus',
    category: 'Calculus',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Safe public video demo
    duration: '1h 12m',
    isPremium: false,
    faculty: 'Prof. Ajay Kumar (IIT Kanpur Alumni)'
  },
  {
    id: 'v2',
    title: 'Probability Masterclass: Partition & Bayes Theorem Geometry',
    description: 'Stop memorizing probability formulas. Learn areolar and conditional logic using Venn partitions.',
    chapter: 'Probability',
    category: 'Probability & Stats',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    duration: '1h 45m',
    isPremium: true,
    faculty: 'Prof. Ajay Kumar (IIT Kanpur Alumni)'
  },
  {
    id: 'v3',
    title: 'Conic Section Double-Tangent Solved Methods',
    description: 'The standard locus of intersection of perpendicular tangents for Parabola, Ellipse, and Hyperbola visualized.',
    chapter: 'Coordinate Geometry',
    category: 'Coordinate Geometry',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '58m',
    isPremium: true,
    faculty: 'Dr. S. K. Verma (IIT Kharagpur)'
  }
];

export const INITIAL_PYQS: PYQ[] = [
  {
    id: 'p1',
    year: 2024,
    exam: 'JEE Advanced',
    chapter: 'Calculus',
    title: 'Problem 4 - Definite Integral and Limit of Sum',
    questionText: 'Evaluate the value of: lim (n -> infinity) sum_{r=1}^n ( (r^4) / (n^5 + r^5) )',
    solutionText: 'The sum can be expressed as: lim (1/n) * sum_{r=1}^n [ (r/n)^4 / (1 + (r/n)^5) ]. Let x = r/n. The limit converts to an integral from 0 to 1 of [ x^4 / (1 + x^5) dx ]. Substituting u = 1 + x^5, du = 5x^4 dx. The integral bounds change from 1 to 2. Absolute integral is int_{1}^{2} du / (5u) = (1/5) * ln(u)|_1^2 = (1/5) * ln(2). Thus, the correct answer is ln(2)/5.'
  },
  {
    id: 'p2',
    year: 2023,
    exam: 'JEE Advanced',
    chapter: 'Complex Numbers',
    title: 'Problem 7 - Minimum Value of Complex Locus',
    questionText: 'If z is a complex number satisfying |z - 3 - 4i| = 2, find the minimum value of |z| and the maximum value of |z|.',
    solutionText: 'The locus of z is a circle centered at c = 3 + 4i with radius r = 2. The distance from the origin to the center c is |3 + 4i| = sqrt(3^2 + 4^2) = 5. The minimum distance from origin to circle is |c| - r = 5 - 2 = 3. The maximum distance is |c| + r = 5 + 2 = 7. Thus, direct geometric analysis easily solves the locus.'
  },
  {
    id: 'p3',
    year: 2022,
    exam: 'JEE Main',
    chapter: 'Algebra',
    title: 'Question 15 - Number of Permutations in Grid',
    questionText: 'Find the number of ways of distributing 8 identical balls into 3 distinct boxes such that each box gets at least 1 ball.',
    solutionText: 'This is a partitions problem of using Stars and Bars. Number of objects n=8, number of boxes k=3. Since each must get at least 1, we first place 1 ball in each of the 3 boxes, leaving us with 5 balls to distribute. Number of ways of distributing 5 identical balls into 3 boxes with zero allowed is C(5 + 3 - 1, 3 - 1) = C(7, 2) = (7 * 6) / 2 = 21 ways.'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'q1',
    title: 'JEE Advanced Mock: Calculus & Limits Marathon',
    description: 'Test your conceptual depth of the Sandwich Theorem, Leibniz Differentiation, and Differentiability under modulus.',
    topic: 'Calculus',
    durationMinutes: 10,
    totalMarks: 15,
    questions: [
      {
        id: 'q1_1',
        questionText: 'If f(x) = int_0^{x^2} sin(sqrt(t)) dt, find the value of f\'(pi/2).',
        options: [
          'pi * sin(pi/2) / 2',
          'pi',
          'pi / 2',
          '0'
        ],
        correctAnswerIndex: 1,
        solutionExplanation: 'By Leibniz Rule, f\'(x) = sin(sqrt(x^2)) * d/dx(x^2) - sin(sqrt(0)) * 0 = sin(|x|) * 2x. Since x = pi/2, f\'(pi/2) = sin(pi/2) * 2(pi/2) = 1 * pi = pi.',
        difficulty: 'Medium'
      },
      {
        id: 'q1_2',
        questionText: 'Let f: R -> R be a differentiable function such that f\'(0) = 4 and f(x + y) = f(x) + f(y) + 3xy(x + y). Find f\'(x).',
        options: [
          '4',
          '3x^2',
          '3x^2 + 4',
          '4x^2 + 3'
        ],
        correctAnswerIndex: 2,
        solutionExplanation: 'Differentiate f(x+y) = f(x) + f(y) + 3x^2*y + 3x*y^2 with respect to y: f\'(x+y) = 0 + f\'(y) + 3x^2 + 6xy. Set y = 0: f\'(x) = f\'(0) + 3x^2. Since f\'(0) = 4, we get f\'(x) = 3x^2 + 4.',
        difficulty: 'Hard'
      },
      {
        id: 'q1_3',
        questionText: 'Find the limit: lim_{x -> 0} (int_0^x e^(t^2) dt - x) / (x^3).',
        options: [
          '1/3',
          '2/3',
          '0',
          '1'
        ],
        correctAnswerIndex: 0,
        solutionExplanation: 'This is a 0/0 form limit. Applying L\'Hospital Rule: lim_{x -> 0} (d/dx(int_0^x e^(t^2) dt - x)) / (d/dx(x^3)) = lim_{x -> 0} (e^(x^2) - 1) / (3x^2). Utilizing standard limits: lim (e^u - 1)/u = 1. Therefore, lim (e^(x^2) - 1)/(x^2) * 1/3 = 1/3.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Algebra Challenge: Complex Roots & Series Summoning',
    description: 'Solve problems involving geometry of complex numbers, harmonic progressions, and quadratic restrictions.',
    topic: 'Algebra',
    durationMinutes: 10,
    totalMarks: 15,
    questions: [
      {
        id: 'q2_1',
        questionText: 'If 1, omega, omega^2 are the cube roots of unity, what is the value of (1 - omega + omega^2)(1 + omega - omega^2)?',
        options: [
          '1',
          '2',
          '3',
          '4'
        ],
        correctAnswerIndex: 3,
        solutionExplanation: 'Since 1 + omega + omega^2 = 0, we can write: (1 - omega + omega^2) = ((-omega) - omega) = -2*omega. (1 + omega - omega^2) = ((-omega^2) - omega^2) = -2*omega^2. Multiplying them together: (-2*omega) * (-2*omega^2) = 4 * omega^3 = 4 * 1 = 4.',
        difficulty: 'Easy'
      },
      {
        id: 'q2_2',
        questionText: 'Find the minimum value of absolute sum of complexes: |z| + |z - 6 - 8i| where z is any complex number.',
        options: [
          '5',
          '10',
          '7',
          '0'
        ],
        correctAnswerIndex: 1,
        solutionExplanation: 'By triangle inequality, |a| + |b| >= |a + b|. Let a = z, b = -(z - 6 - 8i) = -z + 6 + 8i. Then |z| + |z - 6 - 8i| = |z| + |6 + 8i - z| >= |z + (6 + 8i - z)| = |6 + 8i| = sqrt(36 + 64) = 10. The minimum value is reached at any point on the line segment connecting 0 and 6+8i.',
        difficulty: 'Medium'
      }
    ]
  }
];
