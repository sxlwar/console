// Code generated by go-swagger; DO NOT EDIT.

// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// GemaltoConfiguration gemalto configuration
//
// swagger:model gemaltoConfiguration
type GemaltoConfiguration struct {

	// keysecure
	// Required: true
	Keysecure *GemaltoConfigurationKeysecure `json:"keysecure"`
}

// Validate validates this gemalto configuration
func (m *GemaltoConfiguration) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateKeysecure(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *GemaltoConfiguration) validateKeysecure(formats strfmt.Registry) error {

	if err := validate.Required("keysecure", "body", m.Keysecure); err != nil {
		return err
	}

	if m.Keysecure != nil {
		if err := m.Keysecure.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("keysecure")
			}
			return err
		}
	}

	return nil
}

// MarshalBinary interface implementation
func (m *GemaltoConfiguration) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *GemaltoConfiguration) UnmarshalBinary(b []byte) error {
	var res GemaltoConfiguration
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// GemaltoConfigurationKeysecure gemalto configuration keysecure
//
// swagger:model GemaltoConfigurationKeysecure
type GemaltoConfigurationKeysecure struct {

	// credentials
	// Required: true
	Credentials *GemaltoConfigurationKeysecureCredentials `json:"credentials"`

	// endpoint
	// Required: true
	Endpoint *string `json:"endpoint"`

	// tls
	TLS *GemaltoConfigurationKeysecureTLS `json:"tls,omitempty"`
}

// Validate validates this gemalto configuration keysecure
func (m *GemaltoConfigurationKeysecure) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateCredentials(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateEndpoint(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateTLS(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *GemaltoConfigurationKeysecure) validateCredentials(formats strfmt.Registry) error {

	if err := validate.Required("keysecure"+"."+"credentials", "body", m.Credentials); err != nil {
		return err
	}

	if m.Credentials != nil {
		if err := m.Credentials.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("keysecure" + "." + "credentials")
			}
			return err
		}
	}

	return nil
}

func (m *GemaltoConfigurationKeysecure) validateEndpoint(formats strfmt.Registry) error {

	if err := validate.Required("keysecure"+"."+"endpoint", "body", m.Endpoint); err != nil {
		return err
	}

	return nil
}

func (m *GemaltoConfigurationKeysecure) validateTLS(formats strfmt.Registry) error {

	if swag.IsZero(m.TLS) { // not required
		return nil
	}

	if m.TLS != nil {
		if err := m.TLS.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("keysecure" + "." + "tls")
			}
			return err
		}
	}

	return nil
}

// MarshalBinary interface implementation
func (m *GemaltoConfigurationKeysecure) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *GemaltoConfigurationKeysecure) UnmarshalBinary(b []byte) error {
	var res GemaltoConfigurationKeysecure
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// GemaltoConfigurationKeysecureCredentials gemalto configuration keysecure credentials
//
// swagger:model GemaltoConfigurationKeysecureCredentials
type GemaltoConfigurationKeysecureCredentials struct {

	// domain
	// Required: true
	Domain *string `json:"domain"`

	// retry
	Retry int64 `json:"retry,omitempty"`

	// token
	// Required: true
	Token *string `json:"token"`
}

// Validate validates this gemalto configuration keysecure credentials
func (m *GemaltoConfigurationKeysecureCredentials) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateDomain(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateToken(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *GemaltoConfigurationKeysecureCredentials) validateDomain(formats strfmt.Registry) error {

	if err := validate.Required("keysecure"+"."+"credentials"+"."+"domain", "body", m.Domain); err != nil {
		return err
	}

	return nil
}

func (m *GemaltoConfigurationKeysecureCredentials) validateToken(formats strfmt.Registry) error {

	if err := validate.Required("keysecure"+"."+"credentials"+"."+"token", "body", m.Token); err != nil {
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (m *GemaltoConfigurationKeysecureCredentials) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *GemaltoConfigurationKeysecureCredentials) UnmarshalBinary(b []byte) error {
	var res GemaltoConfigurationKeysecureCredentials
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// GemaltoConfigurationKeysecureTLS gemalto configuration keysecure TLS
//
// swagger:model GemaltoConfigurationKeysecureTLS
type GemaltoConfigurationKeysecureTLS struct {

	// ca
	// Required: true
	Ca *string `json:"ca"`
}

// Validate validates this gemalto configuration keysecure TLS
func (m *GemaltoConfigurationKeysecureTLS) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateCa(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *GemaltoConfigurationKeysecureTLS) validateCa(formats strfmt.Registry) error {

	if err := validate.Required("keysecure"+"."+"tls"+"."+"ca", "body", m.Ca); err != nil {
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (m *GemaltoConfigurationKeysecureTLS) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *GemaltoConfigurationKeysecureTLS) UnmarshalBinary(b []byte) error {
	var res GemaltoConfigurationKeysecureTLS
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
