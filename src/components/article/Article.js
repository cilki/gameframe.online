/**
 * Article is a generic page template for Articles.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium, { StyleRoot } from 'radium';
import ReactHTMLParser from 'react-html-parser';
import { Helmet } from 'react-helmet';
import InstanceDetails from '../instance-details/InstanceDetails';
import InstanceDetailsStyles from '../instance-details/InstanceDetailsStyles';
import Minigrid from '../minigrid/Minigrid';
import Minicard from '../minicard/Minicard';

/**
 * @description - Helper method for rendering a link to a game, developer, or article.
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
 * @returns {React.Component}
 */
function link({
  label, url, cover, key,
}) {
  return (
    <Minicard label={label} url={url} cover={cover} cardKey={`${key}-inner`} key={key} />
  );
}

link.propTypes = {
  label: PropTypes.object.isRequired, //eslint-disable-line
  url: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  key: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

function primaryInfoCluster({
  title,
  author,
  timestamp,
}) {
  const published = timestamp ?
    (new Date(timestamp)).toLocaleString() : null;

  return (
    <div style={[InstanceDetailsStyles.articlePrimaryInfoCluster]}>
      <div style={[InstanceDetailsStyles.titleText]}>
        {title}
      </div>
      <div style={[InstanceDetailsStyles.authorIndicator]}>
        {author ? `Written by ${author}` : 'Unknown author.'}
      </div>
      <div style={[InstanceDetailsStyles.publishDateIndicator]}>
        {timestamp ? `Published ${published}` : 'Unknown publication date.'}
      </div>
    </div>
  );
}

primaryInfoCluster.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  timestamp: PropTypes.string,
};

primaryInfoCluster.defaultProps = {
  title: null,
  author: null,
  timestamp: new Date().toString(),
};

function introductionSection({
  introduction,
}) {
  return (
    <div>
      <hr style={[InstanceDetailsStyles.horizontalRule]} />
      <div>
        <div style={[InstanceDetailsStyles.synopsisIndicator]}>
          Introduction:
        </div>
        <div style={[InstanceDetailsStyles.synopsisHTMLContainer]}>
          {ReactHTMLParser(introduction)}
        </div>
      </div>
      <hr style={[InstanceDetailsStyles.horizontalRule]} />
    </div>
  );
}

introductionSection.propTypes = {
  introduction: PropTypes.string,
};

introductionSection.defaultProps = {
  introduction: null,
};

function articleButton({
  articleLink,
}) {
  const articleURL = articleLink && articleLink.indexOf('http') < 0 ?
    `http://${articleLink}` : articleLink;

  return (
    <a href={articleURL} style={[InstanceDetailsStyles.bigButton]} key="articleURL">
      Original Article
    </a>
  );
}

articleButton.propTypes = {
  articleLink: PropTypes.string,
};

articleButton.defaultProps = {
  articleLink: null,
};

function outletButton({
  outlet,
}) {
  const outletURL = outlet && outlet.indexOf('http') < 0 ?
    `http://${outlet}` : outlet;

  return (
    <a href={outletURL} style={[InstanceDetailsStyles.bigButton]} key="outletURL">
      Outlet Website
    </a>
  );
}

outletButton.propTypes = {
  outlet: PropTypes.string,
};

outletButton.defaultProps = {
  outlet: null,
};

function bigButtonCluster({
  left,
  right,
}) {
  return (
    <div style={[InstanceDetailsStyles.bigButtonCluster]}>
      {articleButton({ articleLink: left })}
      {outletButton({ outlet: right })}
    </div>
  );
}

bigButtonCluster.propTypes = {
 left: PropTypes.object, // eslint-disable-line
 right: PropTypes.object, // eslint-disable-line
};

bigButtonCluster.defaultProps = {
  left: null,
  right: null,
};

function developerGridCluster({
  developers,
}) {
  return (
    <div style={[InstanceDetailsStyles.developerGridCluster('30%')]}>
      <div style={[InstanceDetailsStyles.developerIndicator]}>
        Developers:
      </div>
      <Minigrid>
        {
          developers.map(developer => link({
            label: developer.name,
            url: `/developers/${developer.id}`,
            cover: (developer.logo && developer.logo.indexOf('http') < 0 ? `https://${developer.logo}` : developer.logo),
            key: `developer-${developer.id}`,
          }))
        }
      </Minigrid>
    </div>
  );
}

developerGridCluster.propTypes = {
  developers: PropTypes.array, // eslint-disable-line
};

developerGridCluster.defaultProps = {
  developers: [],
};

function gameGridCluster({
  games,
}) {
  return (
    <div style={[InstanceDetailsStyles.gameGridCluster('60%')]}>
      <div style={[InstanceDetailsStyles.gameIndicator]}>
        Games:
      </div>
      <Minigrid>
        {
          games.map(game => link({
            label: game.name,
            url: `/games/${game.id}`,
            cover: (game.cover && game.cover.indexOf('http') < 0 ? `https://${game.cover}` : game.cover),
            key: `game-${game.id}`,
          }))
        }
      </Minigrid>
    </div>
  );
}

gameGridCluster.propTypes = {
  games: PropTypes.array, // eslint-disable-line
};

gameGridCluster.defaultProps = {
  games: [],
};

function modelGridClusters({
  developers,
  games,
}) {
  return (
    <div style={[InstanceDetailsStyles.externalGridCluster]}>
      {developerGridCluster({ developers })}
      {gameGridCluster({ games })}
    </div>
  );
}

modelGridClusters.propTypes = {
  developers: PropTypes.array, // eslint-disable-line
  games: PropTypes.array, // eslint-disable-line
};

modelGridClusters.defaultProps = {
  developers: [],
  games: [],
};

/**
 * @description - Returns the main component to render a article's own
 * page.
 * @param {Object} props
 * @returns {React.Component}
 */
class Article extends React.Component {
  static propTypes = {
    article_link: PropTypes.string.isRequired, //eslint-disable-line
    author: PropTypes.string,
    developers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    games: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    cover: PropTypes.string,
    introduction: PropTypes.string,
    outlet: PropTypes.string,
    timestamp: PropTypes.string,
    title: PropTypes.string,
    fetchArticle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    article_link: '',
    author: '',
    developers: [],
    games: [],
    cover: null,
    introduction: '',
    outlet: '',
    timestamp: '',
    title: '',
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchArticle();
  }

  render() {
    const coverURL = this.props.cover && this.props.cover.indexOf('http') < 0 ?
      `https://${this.props.cover}` : this.props.cover;
    return (
      <StyleRoot>
        <Helmet>
          <title>{`${this.props.title} - GameFrame.online`}</title>
        </Helmet>
        <InstanceDetails imageURL={coverURL}>
          <div style={[InstanceDetailsStyles.articlePrimaryDataCluster]}>
            <div style={[InstanceDetailsStyles.articleCover]}>
              <div style={[InstanceDetailsStyles.articleCoverImageBoundingBox]}>
                <a href={coverURL}>
                  <img
                    style={[InstanceDetailsStyles.articleCoverImage]}
                    src={coverURL}
                    alt={`${this.props.title} cover`}
                  />
                </a>
              </div>
            </div>
            {
              primaryInfoCluster({
                title: this.props.title,
                author: this.props.author,
                timestamp: this.props.timestamp,
              })
            }
          </div>
          {
            introductionSection({
              introduction: this.props.introduction,
            })
          }
          {
            bigButtonCluster({
              left: this.props.article_link,
              right: this.props.outlet,
            })
          }
          {
            modelGridClusters({
              developers: this.props.developers,
              games: this.props.games,
            })
          }
        </InstanceDetails>
      </StyleRoot>
    );
  }
}

export default Radium(Article);
