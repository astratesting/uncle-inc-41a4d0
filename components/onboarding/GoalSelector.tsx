'use client';

interface GoalSelectorProps {
  onSelect: (goal: string) => void;
  selected: string;
}

const goals = [
  {
    id: 'validate',
    label: 'Validate an idea',
    description: 'Test demand before you build anything',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'mvp',
    label: 'Build an MVP',
    description: 'Go from concept to working product fast',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 'customers',
    label: 'Get first customers',
    description: 'Find and reach your earliest adopters',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function GoalSelector({ onSelect, selected }: GoalSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium mb-3" style={{ color: '#1a1a1a' }}>
        What are you trying to do?
      </p>
      {goals.map((goal) => (
        <button
          key={goal.id}
          type="button"
          onClick={() => onSelect(goal.id)}
          className="w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:shadow-sm"
          style={{
            borderColor: selected === goal.id ? '#C8A951' : '#e2e0d8',
            backgroundColor: selected === goal.id ? '#C8A95108' : '#FFFFFF',
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: selected === goal.id ? '#C8A95115' : '#f5f5f4',
              color: selected === goal.id ? '#C8A951' : '#78716c',
            }}
          >
            {goal.icon}
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>
              {goal.label}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#666' }}>
              {goal.description}
            </p>
          </div>
          <div className="ml-auto flex-shrink-0">
            <div
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
              style={{
                borderColor: selected === goal.id ? '#C8A951' : '#d6d3d1',
                backgroundColor: selected === goal.id ? '#C8A951' : 'transparent',
              }}
            >
              {selected === goal.id && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
