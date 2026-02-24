-- triggers.sql
-- ReefMaker ML Database Triggers for Orchestration Mapping

-- 1. Project Initialization Trigger (YepCode)
-- Fires when a new project is created to trigger environmental analysis
CREATE OR REPLACE FUNCTION notify_yepcode_site_analysis()
RETURNS TRIGGER AS $$
BEGIN
  -- In a live Supabase environment, this would call a Webhook
  -- For mapping purposes, we log the orchestration event
  RAISE NOTICE 'Orchestration Trigger: YepCode site analysis for project %', NEW.id;
  
  -- Mock Webhook Call logic:
  -- PERFORM net.http_post(
  --   url := 'https://cloud.yepcode.io/mcp/coralfil/sync-noaa-environmental',
  --   headers := '{"Authorization": "Bearer sk-..."}'::jsonb,
  --   body := json_build_object('project_id', NEW.id, 'lat', NEW.lat, 'lng', NEW.lng)::jsonb
  -- );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_project_created
AFTER INSERT ON projects
FOR EACH ROW
EXECUTE FUNCTION notify_yepcode_site_analysis();


-- 2. Design Export Trigger (Prefect)
-- Fires when a design config is marked as 'simulation' or exported
CREATE OR REPLACE FUNCTION notify_prefect_manufacturing()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.mode = 'simulation') THEN
    RAISE NOTICE 'Orchestration Trigger: Prefect manufacturing queue for design %', NEW.id;
    
    -- Mock Webhook Call logic:
    -- PERFORM net.http_post(
    --   url := 'https://api.prefect.cloud/v1/deployments/.../run',
    --   headers := '{"Authorization": "Bearer cli-..."}'::jsonb,
    --   body := json_build_object('design_id', NEW.id, 'parameters', NEW.parameters)::jsonb
    -- );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_design_simulated
AFTER INSERT OR UPDATE ON design_configs
FOR EACH ROW
EXECUTE FUNCTION notify_prefect_manufacturing();


-- 3. Milestone Notification Trigger (Rube)
-- Fires when project status changes to highly relevant milestones
CREATE OR REPLACE FUNCTION notify_rube_stakeholder()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.status != OLD.status AND NEW.status IN ('deployment', 'monitoring')) THEN
    RAISE NOTICE 'Orchestration Trigger: Rube stakeholder notification for project %', NEW.id;
    
    -- Mock Webhook Call logic:
    -- PERFORM net.http_post(
    --   url := 'https://rube.app/mcp/stakeholder-notify',
    --   headers := '{"Authorization": "Bearer eyJ..."}'::jsonb,
    --   body := json_build_object('project_id', NEW.id, 'status', NEW.status)::jsonb
    -- );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_project_milestone
AFTER UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION notify_rube_stakeholder();
