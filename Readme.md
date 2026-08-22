# Manufacturing Intelligence OS MVP

> Turning factory data into decisions.

This repository started as a student Manufacturing Database Management System and is now being evolved into the **Manufacturing Intelligence OS** MVP: an operations workspace for production, inventory, maintenance, and factory knowledge.

## What is implemented now

The current MVP is a **zero-backend demo** that runs directly from the repository and uses realistic seeded factory data.

- **Operations overview:** production output, plan attainment, OEE, alerts, production trend, inventory risk.
- **Production control:** line-level target vs actual, OEE, status, and a demo output logging action.
- **Inventory intelligence:** stock, reorder points, coverage, and material-risk visibility.
- **Maintenance command center:** maintenance exceptions with severity and resolution workflow.
- **Factory knowledge:** indexed SOP/manual/quality/plan records plus a deterministic demo question-answering layer.
- **Responsive UI:** desktop sidebar and mobile navigation.
- **No fake AI claims:** the current answer layer is explicitly a demo. It is not yet an LLM/RAG system.

## Product thesis

Factory data is fragmented across production systems, spreadsheets, maintenance logs, inventory records, SOPs, manuals, and quality documents.

The product eventually combines those sources so a manager can ask questions such as:

> Which production line is underperforming today, and why?

The target architecture uses structured SQL data for operational facts and RAG over factory documents for procedural knowledge. The LLM should interpret evidence, not become the source of truth.

## MVP architecture

```text
Current demo
Browser
  └── HTML + CSS + JavaScript
       └── Seeded factory dataset
            ├── Production
            ├── Inventory
            ├── Maintenance
            └── Documents

Target production architecture

Factory systems / CSV / ERP / MES / IoT
                 │
                 ▼
          PostgreSQL + pgvector
             │           │
             │           └── SOPs / manuals / quality docs
             ▼
        Query + retrieval layer
             │
       ┌─────┴─────┐
       ▼           ▼
      SQL        RAG retrieval
       │           │
       └─────┬─────┘
             ▼
       Evidence context
             ▼
        LLM assistant
             ▼
    Answer + evidence + actions
```

## Repository structure

The original HTML/CSS/JS pages remain in the repository as historical project material. The new MVP entry point is:

```text
index.html      # FactoryOS application shell
styles.css      # MVP design system and responsive layout
app.js          # seeded data, views, interactions, demo intelligence
```

Legacy pages such as `dashboard.html`, `orders.html`, `products.html`, and the original SQL project are retained for reference while the application is migrated.

## Technology direction

### Current

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages-compatible static deployment

### Next production iteration

- Next.js / React / TypeScript
- Supabase PostgreSQL
- Supabase Auth + Row Level Security
- pgvector
- FastAPI or Next.js API routes
- LLM provider for grounded assistant responses
- Object storage for manuals and SOPs

## Data model for the next iteration

Core entities:

```text
Factory
 ├── ProductionLine
 │    └── ProductionRun
 ├── Machine
 │    └── MaintenanceEvent
 ├── InventoryItem
 ├── QualityRecord
 ├── Supplier
 ├── ProductionOrder
 └── Document
```

The database should become the source of truth. The assistant should receive narrowly scoped, read-only access and every generated answer should expose the evidence used to reach it.

## RAG roadmap

```text
Document upload
      ↓
Parse + clean
      ↓
Chunk
      ↓
Embed
      ↓
pgvector
      ↓
Retrieve + rerank
      ↓
Build evidence context
      ↓
LLM
      ↓
Answer + citations
```

Structured questions should use SQL:

```text
"What was production yesterday?"
          ↓
      Query router
          ↓
      PostgreSQL
          ↓
        Result
```

Document questions should use retrieval:

```text
"How do I service Machine M102?"
          ↓
      Query router
          ↓
     Semantic search
          ↓
       Relevant SOP
          ↓
          LLM
```

Complex questions can combine both paths.

## Security principles

Manufacturing data is commercially sensitive. The production version should enforce:

- Row-level tenant/factory isolation
- Role-based access control
- Least-privilege database credentials
- Read-only AI database access
- SQL allowlisting/validation
- Query and answer audit logs
- Document-level permissions
- Prompt-injection defenses
- Input/output validation
- Encrypted connections

Never give an AI agent unrestricted write access to production manufacturing data.

## Roadmap

### Phase 1 — MVP foundation

- [x] Factory operations dashboard
- [x] Production monitoring
- [x] Inventory monitoring
- [x] Maintenance monitoring
- [x] Factory knowledge UI
- [x] Seeded demonstration dataset
- [ ] PostgreSQL schema
- [ ] Authentication
- [ ] Persistent multi-user data

### Phase 2 — Real operations

- [ ] Supabase/PostgreSQL backend
- [ ] Production CRUD
- [ ] Inventory transactions
- [ ] Maintenance work orders
- [ ] Quality records
- [ ] RBAC
- [ ] CSV import

### Phase 3 — Intelligence

- [ ] Document ingestion
- [ ] Embeddings + pgvector
- [ ] Semantic retrieval
- [ ] SQL query router
- [ ] Natural-language-to-SQL
- [ ] Evidence citations
- [ ] RAG assistant

### Phase 4 — Manufacturing intelligence

- [ ] Root-cause analysis
- [ ] Downtime analysis
- [ ] Production forecasting
- [ ] Inventory risk prediction
- [ ] Predictive maintenance
- [ ] Recommended actions

### Phase 5 — Enterprise

- [ ] ERP/MES integrations
- [ ] IoT/telemetry ingestion
- [ ] Multi-factory support
- [ ] Advanced analytics
- [ ] Enterprise security and audit controls

## MVP success criterion

The first version does **not** need to replace an ERP.

It needs to prove one hypothesis:

> A factory manager can connect operational data and factory documents, ask a meaningful question in plain language, and receive an accurate answer grounded in evidence.

The current repository proves the **workflow and interface**. The next engineering milestone is replacing the demo data layer with a real PostgreSQL/Supabase backend and replacing the deterministic question matcher with a guarded SQL + RAG orchestration layer.
