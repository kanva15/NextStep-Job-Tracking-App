import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ company: '', position: '', notes: '', status: 'Applied' });
  const [editJob, setEditJob] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/applications');
    setJobs(res.data);
  };

  const handleChange = (e) => setNewJob({ ...newJob, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/applications', newJob);
    setNewJob({ company: '', position: '', notes: '', status: 'Applied' });
    fetchJobs();
  };

  const handleEditChange = (e) => setEditJob({ ...editJob, [e.target.name]: e.target.value });
  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/applications/${editJob._id}`, editJob);
    setEditJob(null);
    fetchJobs();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/applications/${id}`);
    fetchJobs();
  };

  // ✅ Compute summary counts
  const counts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  // ✅ Filtered jobs based on selected filter
  const filteredJobs = filter === 'All' ? jobs : jobs.filter(job => job.status === filter);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <button className="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#addJobModal">
        + Add Job
      </button>

      {/* ✅ Summary */}
      <div className="alert alert-light">
        📊 Summary: 
        <span className="ms-2">Applied: <strong>{counts['Applied'] || 0}</strong></span>,
        <span className="ms-2">Interview: <strong>{counts['Interview'] || 0}</strong></span>,
        <span className="ms-2">Offer: <strong>{counts['Offer'] || 0}</strong></span>,
        <span className="ms-2">Rejected: <strong>{counts['Rejected'] || 0}</strong></span>
      </div>

      {/* ✅ Filter dropdown */}
      <div className="mb-3">
        <select className="form-select w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Jobs list */}
      <div>
        {filteredJobs.map(job => (
          <div key={job._id} className="border p-2 mb-2">
            <strong>{job.company}</strong> - {job.position}
            <span className={`badge ms-2 ${
              job.status === 'Applied' ? 'bg-warning' :
              job.status === 'Interview' ? 'bg-info' :
              job.status === 'Offer' ? 'bg-success' : 'bg-danger'
            }`}>{job.status}</span>
            <button className="btn btn-sm btn-info mx-1" data-bs-toggle="modal" data-bs-target="#editJobModal" onClick={() => setEditJob({ ...job })}>
              Edit
            </button>
            <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(job._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <div className="modal fade" id="addJobModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Add New Job</h5></div>
          <div className="modal-body">
            <input type="text" name="company" className="form-control mb-2" placeholder="Company" value={newJob.company} onChange={handleChange} />
            <input type="text" name="position" className="form-control mb-2" placeholder="Position" value={newJob.position} onChange={handleChange} />
            <textarea name="notes" className="form-control mb-2" placeholder="Notes" value={newJob.notes} onChange={handleChange}></textarea>
            <select name="status" className="form-select" value={newJob.status} onChange={handleChange}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">Save</button>
          </div>
        </div></div>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="editJobModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Edit Job</h5></div>
          <div className="modal-body">
            <input type="text" name="company" className="form-control mb-2" placeholder="Company" value={editJob?.company || ''} onChange={handleEditChange} />
            <input type="text" name="position" className="form-control mb-2" placeholder="Position" value={editJob?.position || ''} onChange={handleEditChange} />
            <textarea name="notes" className="form-control mb-2" placeholder="Notes" value={editJob?.notes || ''} onChange={handleEditChange}></textarea>
            <select name="status" className="form-select" value={editJob?.status || 'Applied'} onChange={handleEditChange}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button className="btn btn-primary" onClick={handleUpdate} data-bs-dismiss="modal">Update</button>
          </div>
        </div></div>
      </div>

    </div>
  );
}

export default Dashboard;
