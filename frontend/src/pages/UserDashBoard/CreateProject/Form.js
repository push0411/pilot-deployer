import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Form.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const generateProjectID = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `PRJ${random}`;
};

const generateComID = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `COM${random}`;
};

const Form = () => {
  const [step, setStep] = useState(1);
  const [stepHistory, setStepHistory] = useState([]);
  const [projectID, setProjectID] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    components: [],
    teamID: '',
    guideID: '',
  });

const navigate = useNavigate();

  const [allComponents, setAllComponents] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestedComponents, setRequestedComponents] = useState([{ name: '', purpose: '', image:'', price:'' }]);
  const [search, setSearch] = useState('');
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    if (step === 1) {
      setProjectID(generateProjectID());
    }
  }, []);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/get-all-components`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const valid = data.data
            .filter(c => c && typeof c.title === 'string')
            .map(c => ({ ...c, name: c.title, id: c.cID }));
          setAllComponents(valid);
        } else {
          console.error('Invalid component data:', data);
        }
      } catch (error) {
        console.error('Error fetching components:', error);
      }
    };

    fetchComponents();
  }, []);

  const handleComponentChange = (index, field, value) => {
    const updated = [...formData.components];
    updated[index][field] = value;
    setFormData({ ...formData, components: updated });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ID:projectID,
        type: formData.type,
        title: formData.name,
        description: formData.description,
        teamID: formData.teamID,
        guideID: formData.guideID,
        components: formData.components.map(comp => ({
          id: comp.id,
          name: comp.name,
          purpose: comp.purpose,
          quantity: comp.quantity
        }))
      };
      console.log(dataToSend);
      const response = await fetch(`${BASE_URL}/create-project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();
      console.log(result);
      if(result.success){
        alert('Project submitted successfully!');
        
        navigate(-1);
      }
      else
        alert('Project Submission Failed!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed.');
    }
  };

  const goNext = (nextStep) => {
    setStepHistory(prev => [...prev, step]);
    setStep(nextStep);
  };

  const goBack = () => {
    const history = [...stepHistory];
    const prevStep = history.pop();
    if (prevStep !== undefined) {
      setStep(prevStep);
      setStepHistory(history);
    }
  };

  const stepAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
  <motion.div key="step1" {...stepAnimation}>
    <div className="form-section">
      <label>Project Type:</label>
      <select
        className="abcc"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      >
        <option value="">Select</option>
        <option value="Mini">Mini</option>
        <option value="Mega">Mega</option>
      </select>

      <label>Project ID:</label>
      <input className="abcc" type="text" value={projectID} readOnly />

      <div className="ack-nowledge-line">
        <div>
          <input
            type="checkbox"
            id="ackCheckbox"
            onChange={(e) => setAcknowledged(e.target.checked)}
          />
          <label htmlFor="ackCheckbox"> I acknowledge that I have read instructions</label>
        </div>
        <button
          className="Nxt"
          disabled={!acknowledged || !formData.type}
          onClick={() => goNext(2)}
        >
          Next
        </button>
      </div>
    </div>

    <div className="instruction-card">
      <h3 className='h13'>Instructions</h3>
      <ul>
        <li>Project ID is system-generated and shown only now. Note it</li>
        <li>Only components can be edited later.</li>
        <li>Specify clear purpose for each component.</li>
        <li>Team with incomplete project members needs HoD approval.</li>
        <li>Unreturned components incur 70% cost penalty.</li>
      </ul>
    </div>
  </motion.div>
);

      case 2:
        return (
          <motion.div key="step2" {...stepAnimation}>
            <label>Project Name:</label>
            <input className='abcc' type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <label>Project Description:</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>

            <button onClick={goBack}>Back</button>
            <button onClick={() => goNext(3)}>Next</button>
          </motion.div>
        );

      case 3:
  return (
    <motion.div key="step3" {...stepAnimation}>
      <h3 className='h13'>Component Selection</h3>

      <div className="search-bar-with-dropdown">
        <h4 className='h14'>Component Search</h4>
        <div className="search-bar-row">
          <input
            className="test1"
            type="text"
            placeholder="Search component..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="dropdown-toggle" onClick={() => setShowAvailable(!showAvailable)}>
            {showAvailable ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {showAvailable && (
        <div className="search-table">
          <h4 className='h14'>Available Components</h4>
          <table>
            <thead>
              <tr><th>Name</th><th>Select</th></tr>
            </thead>
            <tbody>
              {allComponents
                .filter(comp => comp.name.toLowerCase().includes(search.toLowerCase()))
                .map((comp, i) => (
                  <tr key={i}>
                    <td>{comp.name}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.components.some(c => c.name === comp.name)}
                        onChange={(e) => {
                          const selected = formData.components;
                          const already = selected.find(c => c.name === comp.name);
                          if (e.target.checked && !already) {
                            setFormData({
                              ...formData,
                              components: [
                                ...selected,
                                {
                                  name: comp.name,
                                  id: comp.id,
                                  purpose: '',
                                  quantity: 1
                                }
                              ]
                            });
                          } else if (!e.target.checked && already) {
                            setFormData({
                              ...formData,
                              components: selected.filter(c => c.name !== comp.name)
                            });
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Missing Component Prompt */}
      <div className="missing-component-request">
        <p>
          Can't find your component?{' '}
          <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setShowRequestForm(!showRequestForm)}>
            Request it here
          </span>
        </p>
      </div>

      {/* Component Request Form */}
      {showRequestForm && (
        <div className="component-request-form">
          <h4 className='h14'>Request New Component</h4>
          <input
            type="text"
            placeholder="Component Name *"
            value={requestedComponents[0].name}
            onChange={(e) => {
              const updated = [...requestedComponents];
              updated[0].name = e.target.value;
              setRequestedComponents(updated);
            }}
          />

          <textarea
            placeholder="Description"
            value={requestedComponents[0].purpose}
            onChange={(e) => {
              const updated = [...requestedComponents];
              updated[0].purpose = e.target.value;
              setRequestedComponents(updated);
            }}
          />

          <input
            type="number"
            placeholder="Approximate Price (₹)"
            value={requestedComponents[0].price || ''}
            onChange={(e) => {
              const updated = [...requestedComponents];
              updated[0].price = e.target.value;
              setRequestedComponents(updated);
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const updated = [...requestedComponents];
                  updated[0].image = reader.result;
                  setRequestedComponents(updated);
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          {/* Image Preview */}
          {requestedComponents[0].image && (
            <div style={{ marginTop: '10px' }}>
              <p>Preview:</p>
              <img
                src={requestedComponents[0].image}
                alt="Component Preview"
                style={{ maxWidth: '150px', borderRadius: '8px' }}
              />
            </div>
          )}

<button
  onClick={async () => {
    const comp = requestedComponents[0];
    if (!comp.name.trim()) {
      alert("Component name is required.");
      return;
    }

    const comID = generateComID();
    const newComponentPayload = {
      name: comp.name,
      cID: comID,
      description: comp.purpose || '',
      quantity: 0,
      image: comp.image || '',
      price: comp.price || ''
    };

    try {
      const res = await fetch(`${BASE_URL}/create-component/form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newComponentPayload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Component request submitted successfully!");

        // ✅ Use cID (your generated one) as the `id`
        setFormData((prev) => ({
          ...prev,
          components: [
            ...prev.components,
            {
              id: comID,  // 👈 This ensures it shows up in step 4 and 6
              name: comp.name,
              purpose: comp.purpose || '',
              quantity: 1
            }
          ]
        }));
      } else {
        alert("Request failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Failed to submit request", err);
      alert("Something went wrong. Please try again later.");
    }

    setShowRequestForm(false);
    setRequestedComponents([{ name: '', purpose: '', image: '', price: '' }]);
  }}
>
  Submit Request
</button>

        </div>
      )}

      <button onClick={goBack}>Back</button>
      <button onClick={() => goNext(4)} disabled={formData.components.length === 0}>Next</button>
    </motion.div>
  );


      case 5:
        return (
          <motion.div key="step4" {...stepAnimation}>
            <label>Team ID:</label>
            <input type="text" value={formData.teamID} onChange={(e) => setFormData({ ...formData, teamID: e.target.value })} />
            <label>Guide ID:</label>
            <input type="text" value={formData.guideID} onChange={(e) => setFormData({ ...formData, guideID: e.target.value })} />

            <button onClick={goBack}>Back</button>
            <button onClick={() => goNext(6)}>Next</button>
          </motion.div>
        );

      case 4:
        return (
          <motion.div key="step5" {...stepAnimation}>
            <h3 className='h13'>Set Purpose for Each Component</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Component</th>
                  <th>Purpose</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {formData.components.map((comp, index) => (
                  <tr key={index}>
                    <td>{comp.id}</td>
                    <td>{comp.name}</td>
                    <td>
                      <input
                        type="text"
                        value={comp.purpose}
                        onChange={(e) => handleComponentChange(index, 'purpose', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={comp.quantity}
                        onChange={(e) => handleComponentChange(index, 'quantity', parseInt(e.target.value))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={goBack}>Back</button>
            <button onClick={() => goNext(5)}>Next</button>
          </motion.div>
        );

      case 6:
        return (
          <motion.div key="step6" {...stepAnimation}>
            <h3 className='h13'>Review Summary</h3>
            <p><strong>Project ID:</strong> {projectID}</p>
            <p><strong>Type:</strong> {formData.type}</p>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Description:</strong> {formData.description}</p>
            <p><strong>Team ID:</strong> {formData.teamID}</p>
            <p><strong>Guide ID:</strong> {formData.guideID}</p>

            <h4 className='h14'>Components</h4>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Purpose</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {formData.components.map((comp, i) => (
                  <tr key={i}>
                    <td>{comp.id}</td>
                    <td>{comp.name}</td>
                    <td>{comp.purpose}</td>
                    <td>{comp.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ack">
              <input type="checkbox" onChange={(e) => setAcknowledged(e.target.checked)} />
              I confirm all information is correct. And only components can be edited later.
            </div>

            <button onClick={goBack}>Back</button>
            <button disabled={!acknowledged} onClick={handleSubmit}>Submit</button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="project-form">
      <div className="progress-container">
  {['Type', 'Details', 'Components', 'Component Details', 'Team', 'Summary'].map((label, index) => {
    const stepNumber = index + 1;
    const isActive = step === stepNumber;
    const isCompleted = step > stepNumber;
    
    return (
      <div
        key={index}
        className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
        onClick={() => {
  if (stepNumber < step) {
    // Going back: allow directly
    setStep(stepNumber);
    setStepHistory((prev) => prev.slice(0, prev.indexOf(stepNumber)));
  } else if (stepNumber === step) {
    // Same step: do nothing
    return;
  } else if (stepNumber === step + 1) {
    // Allow direct next step only
    setStepHistory((prev) => [...prev, step]);
    setStep(stepNumber);
  }
}}

      >
        <div className="step-circle">{stepNumber}</div>
        <span className="step-label">{label}</span>
        {index !== 5 && <div className="step-line" />}
      </div>
    );
  })}
</div>

      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
};

export default Form;