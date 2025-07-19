import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as postsService from './api/api';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    postsService
      .getUsers()
      .then(setUsers)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (selectedUser) {
      postsService
        .getUserPosts(selectedUser.id)
        .then(posts => setUserPosts(posts))
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelect={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {/* <Loader /> */}

                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  {errorMessage}
                </div>

                {/* <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div> */}

                {userPosts && <PostsList />}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
