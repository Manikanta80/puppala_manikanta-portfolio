// Repository links are intentionally empty until each URL has been confirmed.
export const projects = [
  {
    id: 1,
    title: 'DataGuard AI',
    subtitle: 'AI-powered data quality & validation',
    description: 'A Python open-source project inspired by practical data validation challenges. It combines deterministic checks with an AI-assisted way to explore findings.',
    stack: ['Python', 'Pandas', 'LangChain', 'LangGraph', 'MCP', 'pytest'],
    features: ['Missing values, duplicate rows and duplicate keys', 'Data type mismatches and range checks', 'Statistical outlier detection', 'Natural-language questions over validation findings', 'LangGraph validation, summarization, routing and report workflow', 'Custom MCP server with three validation and finding-analysis tools', '21 passing unit tests'],
    pipeline: ['Dataset', 'Validation rules', 'Findings', 'AI-assisted analysis', 'Quality report'],
    github: '',
    disclaimer: 'Personal project. AI assistance interprets findings; validation checks are performed by the project logic.'
  },
  {
    id: 2,
    title: 'Smart Banking Analytics',
    subtitle: 'Loan approval & risk prediction engine',
    description: 'A machine-learning project exploring loan approval and risk prediction on a dataset of 4,269 records. It is an analytical project and is not used by a real bank.',
    stack: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib', 'Scikit-learn', 'Jupyter Notebook', 'Power BI'],
    features: ['Data preprocessing and exploratory analysis', 'Random Forest model', '80/20 train-test split', 'Approximately 97.7% reported model accuracy'],
    pipeline: ['4,269 records', 'Preprocessing & EDA', '80/20 split', 'Random Forest', 'Evaluation & visuals'],
    github: '',
    disclaimer: 'Reported accuracy is a project metric and does not establish real-world lending performance.'
  },
  {
    id: 3,
    title: 'Retail Sales Analytics',
    subtitle: 'SQL analysis & visualization',
    description: 'A personal project that transforms raw retail sales data into structured insights through SQL queries and visualizations.',
    stack: ['Python', 'SQL', 'MySQL', 'Flask', 'Data Visualization'],
    features: ['Raw data processing workflow', 'MySQL database structure', 'SQL-based sales analysis', 'Flask application interface'],
    pipeline: ['Raw sales data', 'Python processing', 'MySQL tables', 'SQL analysis', 'Visual insights'],
    github: '',
    disclaimer: 'Preview area only. No business outcomes or sales figures are claimed.'
  }
]
