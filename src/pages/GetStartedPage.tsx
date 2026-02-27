import { InputText } from 'primereact/inputtext';
import './GetStartedPage.scss';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import ChatAgent from '../classes/ChatAgent';
import majors from "../majors.json";
import AppStorage from '../classes/AppStorage';

function GetStartedPage() {
  const modelOptions = [
    { name: "Gemini", value: "gemini" },
  ];

  // Step 1 form values
  const [model, setModel] = useState(modelOptions[0].value);
  const [apiKey, setApiKey] = useState("");
  // Step 2 form values
  const [department, setDepartment] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [customMajor, setCustomMajor] = useState(false);
  // Setup checklist
  const [checkList, setCheckList] = useState({
    modelSetup: { loading: false, done: false },
    major: { loading: false, done: false },
  });

  const submitApiKey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setCheckList({
      ...checkList,
      modelSetup: { loading: true, done: false },
    });
    const isValid = await ChatAgent.testKey(apiKey);
    if (isValid) {
      alert("API Key is valid! Model setup complete.");
      setCheckList({
        ...checkList,
        modelSetup: { loading: false, done: true },
      });
    } else {
      alert("Invalid API Key. Please try again.");
      setCheckList({
        ...checkList,
        modelSetup: { loading: false, done: false },
      });
    }
  };

  const submitMajorSelection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(major && major.trim() !== "") {
      setCheckList({
        ...checkList,
        major: { loading: false, done: true },
      });
    }
    else {
      alert("Please select or enter a valid major.");
    }
  };

  const getStarted = () => {
    // Save API key, model, and major to localStorage
    AppStorage.saveApiKey(apiKey);
    AppStorage.saveModel(model);
    AppStorage.saveMajor(major);
  };
  
  return (
    <div>
      <h1>Welcome to WAGU!</h1>
      <Accordion>
        <AccordionTab header="Model Selection & API Key" disabled={checkList.modelSetup.done}>
          <h2>Before getting started, please provide your preferable Model as well as an API key to power the application</h2>
          <form className="form-group" onSubmit={submitApiKey}>
            <Dropdown
              value={model}
              onChange={(e) => setModel(e.value)}
              options={modelOptions}
              optionLabel="name" 
              placeholder="Select a Model"
              className="w-full md:w-14rem"
            />
            <InputText
              placeholder="API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button label="Save" type="submit" loading={checkList.modelSetup.loading} />
          </form>
          <span className="api-key-blurb">
            *Please note that your API key will be stored securely and used only for this application. No 3rd party other than
            the AI model provider will have access to your API key.
          </span>
        </AccordionTab>
        <AccordionTab header="Select your major" disabled={!checkList.modelSetup.done || checkList.major.done}>
          <form className="form-group" onSubmit={submitMajorSelection}>
            <div className="dropdown-group">
              {customMajor ? (
                <InputText
                  placeholder="Custom Major"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              ) : (
                <div className="dropdowns">
                  <Dropdown
                    value={department}
                    onChange={(e) => setDepartment(e.value)}
                    options={Object.keys(majors)}
                    optionLabel="name" 
                    placeholder="Select a Department"
                    className="w-full md:w-14rem"
                  />
                  <Dropdown
                    disabled={!department}
                    value={major}
                    onChange={(e) => setMajor(e.value)}
                    options={department ? majors[department as keyof typeof majors] : []}
                    optionLabel="name" 
                    placeholder="Select a Major"
                    className="w-full md:w-14rem"
                  />
                </div>
              )}
              <span className="custom-major-blurb"> 
                <a className="p-button-link" onClick={() => setCustomMajor(!customMajor)}>{ customMajor ? 'Cancel' : 'Create a Custom Major' }</a>
              </span>
            </div>
            <Button label="Select" type="submit" disabled={!major || major.trim() === ""} />
          </form>
        </AccordionTab>
        <AccordionTab header="Get started" disabled={!checkList.modelSetup.done || !checkList.major.done}>
          <h2>You're all set! Click the button below to start your WAGU journey.</h2>
          <Button
            label="Get Started"
            onClick={getStarted}
          />
        </AccordionTab>
      </Accordion>
    </div>
  )
}

export default GetStartedPage
