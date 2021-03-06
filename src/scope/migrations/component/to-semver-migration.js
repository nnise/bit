/** @flow */
import R from 'ramda';
import semver from 'semver';

/**
 * Change all the component's version to be a valid semver
 * @param {*} componentModel - The parsed component model
 */
function changeVersionToSemVer(componentModel: Object): Object {
  const semVerVersions = {};
  const addUpdatedVersion = (value, key) => {
    // In case there is already a semver, do nothing
    if (semver.valid(key)) {
      semVerVersions[key] = value;
    } else {
      const newVersion = `0.0.${key}`;
      semVerVersions[newVersion] = value;
    }
  };
  // Go over the versions array and update them
  R.forEachObjIndexed(addUpdatedVersion, componentModel.versions);
  componentModel.versions = semVerVersions;
  return componentModel;
}

const changeVersionToSemVerDeclartaion = {
  name: 'change version to SemVer',
  migrate: changeVersionToSemVer
};

export default changeVersionToSemVerDeclartaion;
