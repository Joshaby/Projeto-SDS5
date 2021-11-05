package com.devsuperior.dsvendas.resources;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.services.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/sellers")
public class SellerController {

    @Autowired
    private SellerService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<SellerDTO>> findAll() {
        List<SellerDTO> sellerDTOS = service.findAll();
        return ResponseEntity.ok().body(sellerDTOS);
    }
}
