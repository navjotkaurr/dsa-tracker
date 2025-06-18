import { useState } from 'react';
import { useGetTopicsQuery, useToggleProblemStatusMutation } from '../../slice/topicApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TopicTabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [openTabs, setOpenTabs] = useState({});

  const { data: topics = [], isLoading } = useGetTopicsQuery();
  const [toggleProblemStatus] = useToggleProblemStatusMutation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleAccordion = (index) => {
    setOpenTabs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCheckbox = async (id) => {
    try {
      if (!id) return;
      await toggleProblemStatus(id).unwrap();
    } catch (err) {
      console.error('Toggle failed', err);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading topics...</p>;

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-6 bg-gray-50 pb-10 rounded-lg">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 p-6 border rounded-2xl shadow-sm bg-white">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {userInfo?.name || 'User'}👋</h2>
          <p className="text-sm text-gray-500">{userInfo?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Accordion Section */}
      {topics.map((topic, index) => (
        <div key={topic._id || index} className="mb-4 border rounded-xl shadow-md bg-white overflow-hidden">
          <button
            className="w-full text-left px-6 py-5 bg-blue-100 font-semibold text-xl flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
          >
            <span>{topic.topicName}</span>
            {openTabs[index] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {openTabs[index] && (
            <ul className="bg-white px-6 py-4 space-y-6">
              {topic.problems.map((q) => (
                <li key={q._id || q.title} className="pb-4 border-b">
                  <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
                    <label className="flex items-center gap-3 text-base font-medium text-gray-800">
                      <input
                        type="checkbox"
                        checked={q.isCompleted}
                        onChange={() => handleCheckbox(q._id)}
                        className="h-4 w-4 accent-blue-600"
                      />
                      {q.title}
                      <span className="text-sm text-gray-500">({q.level})</span>
                    </label>
                  </div>


                  {/* Links */}
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button
                      onClick={() => window.open(q.leetCodeLink, '_blank')}
                      className="bg-blue-100 text-blue-800 px-4 py-1 rounded-xl text-sm hover:bg-blue-200 transition"
                    >
                      LeetCode
                    </button>

                    {q.codeforcesLink && (
                      <button
                        onClick={() => window.open(q.codeforcesLink, '_blank')}
                        className="bg-purple-100 text-purple-800 px-4 py-1 rounded-xl text-sm hover:bg-purple-200 transition"
                      >
                        Codeforces
                      </button>
                    )}

                    <button
                      onClick={() => window.open(q.youtubeLink, '_blank')}
                      className="bg-red-100 text-red-700 px-4 py-1 rounded-xl text-sm hover:bg-red-200 transition"
                    >
                      YouTube
                    </button>

                    <button
                      onClick={() => window.open(q.articleLink, '_blank')}
                      className="bg-green-100 text-green-700 px-4 py-1 rounded-xl text-sm hover:bg-green-200 transition"
                    >
                      Article
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopicTabs;
