// LocationSelect.styles.tsx
import styled from "styled-components";
import Select from "react-select";
import type { Props as SelectProps } from "react-select";

// seu tipo:
export type OptionType = {
  value: string;
  label: string;
};

// agora você define os props tipados
type StyledSelectProps = SelectProps<OptionType, false> & {
  active?: boolean;
};

export const StyledSelect = styled(Select).withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<StyledSelectProps>`
  .react-select__control {
    background-color: ${({ theme }) => theme.colors.neutral['100']};
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px;
    
  
    transition: border 0.2s ease;
   color: ${({ theme }) => theme.colors.neutral['500']}
  }

  .react-select__control--is-focused {
    border-color: ${({ theme }) => theme.colors.primary.mediumLight};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
    outline: none;
  
  
  }

  .react-select__control:hover {
    border-color: ${({ theme }) => theme.colors.primary.mediumLight};
      .react-select__single-value {
    color: ${({ theme }) => theme.colors.primary.default};
    
  }
    
  }

  .react-select__menu {
 
   
  }

  .react-select__option {
    cursor: pointer;
   

    
  }

  .react-select__option--is-focused {
       background-color:  ${({ theme }) => theme.colors.neutral['200']};
    color: ${({ theme }) => theme.colors.neutral['500']}
    
    
  
  }

  .react-select__option--is-selected {
    background-color: ${({ theme }) => theme.colors.primary.light};
    color:  ${({ theme }) => theme.colors.primary.default};
   
  }


  .react-select__placeholder {
  color: ${({ theme }) => theme.colors.neutral['500']};
  
}

`;