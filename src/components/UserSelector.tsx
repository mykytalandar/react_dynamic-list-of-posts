import { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelect: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
}) => {
  const [onClick, setOnClick] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${onClick && `is-active`}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOnClick(!onClick)}
        >
          <span>{selectedUser ? selectedUser.name : `Choose a user`}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={`dropdown-item ${selectedUser && selectedUser.id === user.id ? 'is-active' : ''}`}
              key={user.id}
              onClick={() => {
                onSelect(user);
                setOnClick(prev => !prev);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
